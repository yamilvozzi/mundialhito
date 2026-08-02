#!/usr/bin/env python3
"""Sincroniza los diccionarios de i18n desde ``i18n/es.js``.

Requiere Python 3.14+ y deep-translator::

    python -m pip install deep-translator

El script no guarda hashes, cachés ni archivos de estado. En cada ejecución
vuelve a traducir el contenido vigente de es.js y reconstruye cada diccionario.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path
from typing import TypeAlias

try:
    from deep_translator import GoogleTranslator
except ImportError:  # El mensaje de error se muestra desde main().
    GoogleTranslator = None  # type: ignore[assignment,misc]


# Agregar un idioma sólo requiere sumar una entrada aquí. La clave es el nombre
# del archivo y el valor es el código que entiende Google Translate.
LANGUAGES: dict[str, str] = {
    "en": "en",
    "fr": "fr",
    "pt": "pt",
    "it": "it",
    "de": "de",
    "zh": "zh-CN",
    "ja": "ja",
    "ko": "ko",
    "ca": "ca",
}

SOURCE_LANGUAGE = "es"
IDENTIFIER = re.compile(r"^[A-Za-z_$][A-Za-z0-9_$]*$")

# Marcadores que no deben pasar por el traductor. Además de los placeholders
# pedidos, se protegen etiquetas HTML y entidades que aparecen en textos UI.
PROTECTED_PART = re.compile(
    r"(\{\{[^{}]+\}\}|\{(?:\d+|[A-Za-z_][A-Za-z0-9_.-]*)\}|"
    r"%%|%(?:\d+\$)?[-+#0 ']*\d*(?:\.\d+)?[diuoxXfFeEgGaAcCs]|"
    r"</?[A-Za-z][A-Za-z0-9:-]*(?:\s+[^<>]*?)?/?>|"
    r"&(?:#[0-9]+|#x[0-9A-Fa-f]+|[A-Za-z]+);)"
)


class I18NParseError(ValueError):
    """El archivo no tiene el subconjunto de objeto JavaScript esperado."""


Tree: TypeAlias = dict[str, "Tree | str"]


class JavaScriptDictionaryParser:
    """Parser pequeño para el objeto literal de I18N.registrarIdioma().

    No ejecuta JavaScript. Admite objetos anidados, claves identificador o
    entre comillas, cadenas JS y comentarios // o /* ... */.
    """

    def __init__(self, text: str, filename: Path) -> None:
        self.text = text
        self.filename = filename
        self.pos = 0

    def parse(self) -> tuple[str, Tree]:
        call = re.search(r"\bI18N\s*\.\s*registrarIdioma\s*\(", self.text)
        if not call:
            self.fail("no se encontró I18N.registrarIdioma(...)")
        self.pos = call.end()
        self.skip_ignored()
        language = self.parse_string()
        self.skip_ignored()
        self.expect(",")
        self.skip_ignored()
        dictionary = self.parse_object()
        self.skip_ignored()
        self.expect(")")
        self.skip_ignored()
        if self.peek() == ";":
            self.pos += 1
        return language, dictionary

    def parse_object(self) -> Tree:
        self.expect("{")
        result: Tree = {}
        self.skip_ignored()
        while self.peek() != "}":
            if not self.peek():
                self.fail("objeto sin llave de cierre")
            key = self.parse_key()
            self.skip_ignored()
            self.expect(":")
            self.skip_ignored()
            value = self.parse_object() if self.peek() == "{" else self.parse_string()
            if key in result:
                self.fail(f"clave duplicada: {key!r}")
            result[key] = value
            self.skip_ignored()
            if self.peek() == ",":
                self.pos += 1
                self.skip_ignored()
            elif self.peek() != "}":
                self.fail("se esperaba ',' o '}'")
        self.pos += 1
        return result

    def parse_key(self) -> str:
        if self.peek() in ("'", '"'):
            return self.parse_string()
        match = re.match(r"[A-Za-z_$][A-Za-z0-9_$]*", self.text[self.pos :])
        if not match:
            self.fail("se esperaba un nombre de clave")
        self.pos += len(match.group(0))
        return match.group(0)

    def parse_string(self) -> str:
        quote = self.peek()
        if quote not in ("'", '"', "`"):
            self.fail("se esperaba una cadena de texto")
        self.pos += 1
        characters: list[str] = []
        while self.pos < len(self.text):
            char = self.text[self.pos]
            self.pos += 1
            if char == quote:
                return self.normalize_surrogates("".join(characters))
            if char != "\\":
                characters.append(char)
                continue
            if self.pos >= len(self.text):
                self.fail("escape incompleto en una cadena")
            escaped = self.text[self.pos]
            self.pos += 1
            simple = {"n": "\n", "r": "\r", "t": "\t", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}
            if escaped in simple:
                characters.append(simple[escaped])
            elif escaped == "\r":
                if self.peek() == "\n":
                    self.pos += 1
            elif escaped == "\n":
                pass
            elif escaped == "x":
                characters.append(chr(int(self.take_hex(2), 16)))
            elif escaped == "u":
                if self.peek() == "{":
                    self.pos += 1
                    end = self.text.find("}", self.pos)
                    if end < 0:
                        self.fail("escape Unicode sin '}'")
                    codepoint = self.text[self.pos : end]
                    self.pos = end + 1
                    characters.append(chr(int(codepoint, 16)))
                else:
                    characters.append(chr(int(self.take_hex(4), 16)))
            else:
                # En JavaScript, un escape no especial equivale al carácter.
                characters.append(escaped)
        self.fail("cadena sin comilla de cierre")

    def take_hex(self, length: int) -> str:
        value = self.text[self.pos : self.pos + length]
        if len(value) != length or not re.fullmatch(r"[0-9A-Fa-f]+", value):
            self.fail("escape hexadecimal inválido")
        self.pos += length
        return value

    @staticmethod
    def normalize_surrogates(value: str) -> str:
        if not any(0xD800 <= ord(char) <= 0xDFFF for char in value):
            return value
        return value.encode("utf-16", "surrogatepass").decode("utf-16", "surrogatepass")

    def skip_ignored(self) -> None:
        while True:
            while self.peek() and self.peek().isspace():
                self.pos += 1
            if self.text.startswith("//", self.pos):
                end = self.text.find("\n", self.pos + 2)
                self.pos = len(self.text) if end < 0 else end + 1
                continue
            if self.text.startswith("/*", self.pos):
                end = self.text.find("*/", self.pos + 2)
                if end < 0:
                    self.fail("comentario /* sin cierre */")
                self.pos = end + 2
                continue
            return

    def expect(self, expected: str) -> None:
        if self.peek() != expected:
            self.fail(f"se esperaba {expected!r}")
        self.pos += 1

    def peek(self) -> str:
        return self.text[self.pos] if self.pos < len(self.text) else ""

    def fail(self, message: str) -> None:
        before = self.text[: self.pos]
        line = before.count("\n") + 1
        column = self.pos - before.rfind("\n")
        raise I18NParseError(f"{self.filename}:{line}:{column}: {message}")


def parse_dictionary(path: Path) -> tuple[str, Tree]:
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError as error:
        raise I18NParseError(f"{path}: el archivo debe estar codificado en UTF-8") from error
    return JavaScriptDictionaryParser(text, path).parse()


def escape_js_string(value: str) -> str:
    escaped: list[str] = []
    for char in value:
        codepoint = ord(char)
        if char == "\\":
            escaped.append("\\\\")
        elif char == "'":
            escaped.append("\\'")
        elif char == "\n":
            escaped.append("\\n")
        elif char == "\r":
            escaped.append("\\r")
        elif char == "\t":
            escaped.append("\\t")
        elif char in ("\u2028", "\u2029") or 0xD800 <= codepoint <= 0xDFFF:
            escaped.append(f"\\u{codepoint:04x}")
        elif codepoint < 0x20:
            escaped.append(f"\\u{codepoint:04x}")
        else:
            escaped.append(char)
    return "'" + "".join(escaped) + "'"


def format_key(key: str) -> str:
    return key if IDENTIFIER.fullmatch(key) else escape_js_string(key)


def render_object(tree: Tree, level: int = 1) -> list[str]:
    lines: list[str] = []
    entries = list(tree.items())
    for index, (key, value) in enumerate(entries):
        suffix = "," if index < len(entries) - 1 else ""
        indent = "  " * level
        if isinstance(value, dict):
            lines.append(f"{indent}{format_key(key)}: {{")
            lines.extend(render_object(value, level + 1))
            lines.append(f"{indent}}}{suffix}")
        else:
            lines.append(f"{indent}{format_key(key)}: {escape_js_string(value)}{suffix}")
    return lines


def render_dictionary(language: str, tree: Tree, *, template: bool = False) -> str:
    if template:
        header = "// Plantilla generada automáticamente desde es.js."
        language = "xx"
    else:
        header = f"// Diccionario generado automáticamente desde es.js ({language})."
    lines = [header, "// No editar manualmente: ejecutar sincronizar_i18n.py.", "", f"I18N.registrarIdioma('{language}', {{"]
    lines.extend(render_object(tree))
    lines.extend(["});", ""])
    return "\n".join(lines)


def leaf_paths(tree: Tree, prefix: tuple[str, ...] = ()) -> dict[tuple[str, ...], str]:
    result: dict[tuple[str, ...], str] = {}
    for key, value in tree.items():
        path = (*prefix, key)
        if isinstance(value, dict):
            result.update(leaf_paths(value, path))
        else:
            result[path] = value
    return result


def value_at(tree: Tree, path: tuple[str, ...]) -> str | None:
    current: Tree | str = tree
    for key in path:
        if not isinstance(current, dict) or key not in current:
            return None
        current = current[key]
    return current if isinstance(current, str) else None


def replace_values(source: Tree, values: dict[tuple[str, ...], str], prefix: tuple[str, ...] = ()) -> Tree:
    result: Tree = {}
    for key, value in source.items():
        path = (*prefix, key)
        result[key] = replace_values(value, values, path) if isinstance(value, dict) else values[path]
    return result


class TextTranslator:
    def __init__(self, target_language: str) -> None:
        if GoogleTranslator is None:
            raise RuntimeError("No se encontró deep-translator. Instalalo con: python -m pip install deep-translator")
        self.translator = GoogleTranslator(source=SOURCE_LANGUAGE, target=target_language)

    def translate(self, value: str) -> str:
        # Separar saltos asegura que se reproduzcan exactamente, incluso si el
        # proveedor intenta normalizarlos.
        parts = re.split(r"(\r\n|\r|\n)", value)
        return "".join(part if part in ("\r\n", "\r", "\n") else self.translate_line(part) for part in parts)

    def translate_line(self, text: str) -> str:
        if not text or not any(char.isalpha() for char in text):
            return text
        leading = re.match(r"^\s*", text).group(0)
        trailing = re.search(r"\s*$", text).group(0)
        core_end = len(text) - len(trailing) if trailing else len(text)
        core = text[len(leading) : core_end]
        if not core:
            return text

        protected: list[str] = []

        def save_protected(match: re.Match[str]) -> str:
            token = f"[[I18NPH{len(protected)}TOKEN]]"
            protected.append(match.group(0))
            return token

        protected_core = PROTECTED_PART.sub(save_protected, core)
        translated = self.request(protected_core)
        tokens = [f"[[I18NPH{index}TOKEN]]" for index in range(len(protected))]
        if all(token in translated for token in tokens):
            for token, original in zip(tokens, protected, strict=True):
                translated = translated.replace(token, original)
        else:
            # Poco frecuente: si el proveedor altera un token, se traduce cada
            # segmento por separado para no perder nunca un placeholder.
            pieces = PROTECTED_PART.split(core)
            translated = "".join(
                piece if index % 2 else self.request(piece)
                for index, piece in enumerate(pieces)
            )
        return leading + translated + trailing

    def request(self, text: str) -> str:
        if not text or not any(char.isalpha() for char in text):
            return text
        last_error: Exception | None = None
        for attempt in range(3):
            try:
                translated = self.translator.translate(text)
                if not isinstance(translated, str) or not translated.strip():
                    raise RuntimeError("el servicio devolvió una traducción vacía")
                return translated
            except Exception as error:  # deep-translator expone varios tipos de error.
                last_error = error
                if attempt < 2:
                    time.sleep(1 + attempt)
        raise RuntimeError(f"no se pudo traducir {text!r}: {last_error}")


@dataclass
class Summary:
    added: int = 0
    updated: int = 0
    removed: int = 0
    created: bool = False


def atomic_write(path: Path, content: str) -> None:
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent, text=True)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as temporary:
            temporary.write(content)
        os.replace(temporary_name, path)
    except BaseException:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass
        raise


def default_i18n_directory() -> Path:
    return Path(__file__).resolve().parent / "i18n"


def synchronize(i18n_dir: Path, dry_run: bool = False) -> dict[str, Summary]:
    source_path = i18n_dir / "es.js"
    if not source_path.is_file():
        raise FileNotFoundError(f"No existe el archivo fuente: {source_path}")
    print(f"Leyendo {source_path}...", flush=True)
    source_language, source = parse_dictionary(source_path)
    if source_language != SOURCE_LANGUAGE:
        raise I18NParseError(f"{source_path}: se esperaba registrarIdioma('es', ...), no {source_language!r}")

    source_leaves = leaf_paths(source)
    planned: list[tuple[Path, str, Summary]] = []
    total_languages = len(LANGUAGES)
    total_texts = len(source_leaves)
    print(
        f"Se encontraron {total_texts} textos. Se traducirán para {total_languages} idiomas.",
        flush=True,
    )

    for language_number, (filename_language, translator_language) in enumerate(LANGUAGES.items(), start=1):
        path = i18n_dir / f"{filename_language}.js"
        existing: Tree = {}
        created = not path.exists()
        if not created:
            _, existing = parse_dictionary(path)
        existing_leaves = leaf_paths(existing)
        translator = TextTranslator(translator_language)
        print(
            f"[{language_number}/{total_languages}] Traduciendo {filename_language}...",
            flush=True,
        )
        translated_values: dict[tuple[str, ...], str] = {}
        for text_number, (path_key, text) in enumerate(source_leaves.items(), start=1):
            translated_values[path_key] = translator.translate(text)
            if text_number % 25 == 0 or text_number == total_texts:
                print(f"    {filename_language}: {text_number}/{total_texts} textos", flush=True)
        translated = replace_values(source, translated_values)
        summary = Summary(
            added=sum(path_key not in existing_leaves for path_key in source_leaves),
            updated=sum(
                path_key in existing_leaves and existing_leaves[path_key] != translated_values[path_key]
                for path_key in source_leaves
            ),
            removed=sum(path_key not in source_leaves for path_key in existing_leaves),
            created=created,
        )
        planned.append((path, render_dictionary(filename_language, translated), summary))

    template_path = i18n_dir / "template.js"
    print("Actualizando template.js...", flush=True)
    template_existing: Tree = {}
    template_created = not template_path.exists()
    if not template_created:
        _, template_existing = parse_dictionary(template_path)
    template_values = {path_key: "" for path_key in source_leaves}
    template = replace_values(source, template_values)
    old_template_leaves = leaf_paths(template_existing)
    template_summary = Summary(
        added=sum(path_key not in old_template_leaves for path_key in source_leaves),
        updated=sum(path_key in old_template_leaves and old_template_leaves[path_key] != "" for path_key in source_leaves),
        removed=sum(path_key not in source_leaves for path_key in old_template_leaves),
        created=template_created,
    )
    planned.append((template_path, render_dictionary("xx", template, template=True), template_summary))

    # Toda la traducción y validación termina antes de reemplazar un archivo.
    # Así un fallo de red no deja un conjunto parcialmente sincronizado.
    if not dry_run:
        for path, content, _ in planned:
            atomic_write(path, content)

    return {path.stem: summary for path, _, summary in planned}


def main() -> int:
    parser = argparse.ArgumentParser(description="Reconstruye los idiomas de i18n desde es.js usando deep-translator.")
    parser.add_argument(
        "--i18n-dir",
        type=Path,
        default=default_i18n_directory(),
        help="carpeta que contiene es.js (por defecto: carpeta i18n junto al script)",
    )
    parser.add_argument("--dry-run", action="store_true", help="traduce y muestra el resumen sin escribir archivos")
    args = parser.parse_args()

    try:
        summary = synchronize(args.i18n_dir.resolve(), args.dry_run)
    except (OSError, I18NParseError, RuntimeError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    print("Resumen de sincronización" + (" (simulación)" if args.dry_run else "") + ":")
    for language, result in summary.items():
        created = "sí" if result.created else "no"
        print(
            f"  {language}: claves agregadas={result.added}, "
            f"traducciones actualizadas={result.updated}, "
            f"claves eliminadas={result.removed}, archivo creado={created}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
