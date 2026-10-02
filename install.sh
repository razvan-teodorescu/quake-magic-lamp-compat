#!/usr/bin/env bash

set -euo pipefail

UUID="quake-magic-lamp-compat@razvan-teodorescu.github.io"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="${HOME}/.local/share/gnome-shell/extensions/${UUID}"

echo "Installing ${UUID}..."

if [[ ! -f "${SCRIPT_DIR}/metadata.json" ]]; then
    echo "Error: metadata.json not found."
    exit 1
fi

if [[ ! -f "${SCRIPT_DIR}/extension.js" ]]; then
    echo "Error: extension.js not found."
    exit 1
fi

if [[ ! -d "${SCRIPT_DIR}/schemas" ]]; then
    echo "Error: schemas directory not found."
    exit 1
fi

if ! command -v glib-compile-schemas >/dev/null 2>&1; then
    echo "Error: glib-compile-schemas is not installed."
    exit 1
fi

mkdir -p "${INSTALL_DIR}"

cp -a "${SCRIPT_DIR}/." "${INSTALL_DIR}/"

glib-compile-schemas "${INSTALL_DIR}/schemas"

echo
echo "Installed to:"
echo "  ${INSTALL_DIR}"
echo
echo "The extension was not enabled automatically."
echo "Enable it with:"
echo
echo "  gnome-extensions enable ${UUID}"
echo
echo "Done."
