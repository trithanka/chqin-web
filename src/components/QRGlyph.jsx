import React, { useMemo } from "react";

// Deterministic QR-like matrix with 3 finder patterns. Purely decorative.
function buildMatrix(size = 25, seedInit = 987654321) {
  const m = Array.from({ length: size }, () => Array(size).fill(false));
  let seed = seedInit;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const finder = (r, c) => {
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 7; j++) {
        const edge = i === 0 || i === 6 || j === 0 || j === 6;
        const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        m[r + i][c + j] = edge || core;
      }
  };
  const inFinderZone = (i, j) =>
    (i < 8 && j < 8) ||
    (i < 8 && j >= size - 8) ||
    (i >= size - 8 && j < 8);
  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++) {
      if (inFinderZone(i, j)) continue;
      m[i][j] = rand() > 0.52;
    }
  return m;
}

export default function QRGlyph({
  size = 25,
  seed = 987654321,
  color = "#ffffff",
  className = "",
  cellGap = 0.12,
}) {
  const matrix = useMemo(() => buildMatrix(size, seed), [size, seed]);
  const rects = [];
  const c = 1 - cellGap;
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++) {
      if (matrix[i][j]) {
        rects.push(
          <rect
            key={`${i}-${j}`}
            x={j + cellGap / 2}
            y={i + cellGap / 2}
            width={c}
            height={c}
            rx={0.18}
            fill={color}
          />
        );
      }
    }
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="ChqIn QR"
      shapeRendering="crispEdges"
    >
      {rects}
    </svg>
  );
}
