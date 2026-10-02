# Quake Magic Lamp Compatibility

A small GNOME Shell extension that prevents the **Compiz alike Magic Lamp Effect** from being applied to the **Quake Terminal** window.

This is a compatibility extension for users who happen to use both extensions together.

## What problem does it solve?

The Magic Lamp extension applies its minimize and restore animations globally. Quake Terminal has its own animations, so the two effects can overlap.

This extension detects the Quake Terminal window and removes the corresponding Magic Lamp effect when the window is minimized or restored.

It does **not** modify either of the original extensions.

## Features

- Disable Magic Lamp animation when Quake Terminal is minimized.
- Disable Magic Lamp animation when Quake Terminal is restored.
- Minimize and restore behavior can be controlled independently.
- Does nothing to other windows.
- Does nothing if Quake Terminal is not present.
- Does nothing if Magic Lamp is not present.
- Designed to fail safely if either extension changes or disappears.

## Requirements

- GNOME Shell 48
- X11
- [Quake Terminal](https://github.com/diegodario88/quake-terminal)
- [Compiz alike Magic Lamp Effect](https://github.com/hermes83/compiz-alike-magic-lamp-effect)

The extension is specifically intended for the interaction between these two extensions and is not intended as a general-purpose animation manager.

## Settings

The preferences window provides two independent switches:

- **Disable Magic Lamp on minimize**
- **Disable Magic Lamp on restore**

Both are enabled by default.

## How it works

When GNOME Shell emits a window minimize or unminimize event, the extension checks whether the affected actor is the Quake Terminal actor.

If it is, the extension looks for the corresponding Magic Lamp effect:

- `MagicLampMinimizeEffect`
- `MagicLampUnminimizeEffect`

If the effect is present and its corresponding setting is enabled, the effect is destroyed.

The extension otherwise leaves the window and both original extensions alone.

## Compatibility

This extension is currently intended for:

- GNOME Shell 48
- X11

It relies on GNOME Shell's X11 window actor behavior and the internal effect names used by the current versions of the two target extensions.

Future GNOME Shell versions may require changes.

## Installation

Clone or download this repository into your GNOME Shell extensions directory:

```text
~/.local/share/gnome-shell/extensions/
```

## Release status

This is the initial public release of the extension.

There is no formal version number assigned yet for this first release, and this repository is intentionally published as the original, unversioned build.

This project is primarily a personal compatibility fix shared openly for anyone who finds it useful, rather than a broad, general-purpose product.

## Scope and intent

This extension exists to solve a very specific compatibility issue between Quake Terminal and the Compiz-alike Magic Lamp effect.

It is designed around a narrow use case and is not intended to become a general animation framework or a widely supported GNOME Shell utility. If someone else finds it useful, they are welcome to use it, but the project is not positioned as a large-scale public extension.

## Repository expectations

This repository is intentionally lightweight and intentionally honest about its scope.

- This is a first-release, personal project.
- No formal version tag is assigned at this time.
- There is no CI/CD pipeline configured for this project.
- There is no automated test suite for this project.
- This repository is maintained only as needed for the specific compatibility issue it addresses.

## Notes

This extension is published as-is for personal use and for anyone who wants to try the same compatibility fix in their own setup.

The goal is not to create a large support ecosystem or a heavily tested public product. The goal is to solve a real problem cleanly, keep the implementation small, and share it without unnecessary process overhead.
