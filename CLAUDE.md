# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational project for the *Graficación* course at TecNM campus Tlajomulco (Ing. en Sistemas Computacionales). Topics covered: 2D graphics, 3D graphics, fill, lighting, and shading — all implemented with the HTML5 Canvas API.

## Running the Project

No build step or package manager. Open `index.html` directly in a browser:

```bash
# Quick local server (avoids image CORS issues)
python3 -m http.server 8080
# then navigate to http://localhost:8080
```

## Architecture

Single-page app — three files:

- [index.html](index.html) — UI: buttons wired to JS functions via `onclick` attributes, one `<canvas id="myCanvas" width="500" height="500">`.
- [script.js](script.js) — All graphics logic. Single global `ctx` (2D context). No modules, no classes.
- [styles.css](styles.css) — Layout only.
- [images/](images/) — Assets used by `drawImage()` (imagen1.jpg) and `drawClock()` (reloj2.jpg).

## Key Conventions

**Coordinate system:** Canvas origin is top-left; mathematical coordinates (Y up) are used in the UI inputs and internally for star/cube. Functions that accept user input negate Y before drawing (e.g., `drawLineFromAtoB`, `drawCircleWithMath`). The canvas center (250, 250) serves as the mathematical origin.

**Global mutable state:**
- `puntosEjeX` / `puntosEjeY` — 51-point arrays defining the star shape; mutated in-place by each `RotateStar*` call. Reset only when `drawStar()` is called fresh.
- `cubeVertices` — 8-vertex array for the cube; mutated in-place by `rotateCube()`.
- `clockInterval` — holds the `setInterval` ID for the animated clock; must be cleared via `stopClock()` before drawing other things.

**3D projection:** Orthographic only (no perspective divide). `project3D()` maps `(x, y, z)` to canvas by offsetting from center and flipping Y. The cube uses the painter's algorithm (faces sorted by average Z, farthest drawn first).

**Adding new features:** Follow the pattern — add a `<button onclick="newFunction()">` in [index.html](index.html) and implement `newFunction()` in [script.js](script.js). Call `clearCanvas()` and `dibujarPlanoCartesiano()` at the start if the feature needs a clean grid.
