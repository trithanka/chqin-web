import React, { useMemo } from "react";
import QRCode from "qrcode";

export default function QRGlyph({
  value = "https://chqin-pwa.vercel.app",
  color = "#ffffff",
  bgColor,
  className = "",
  cellGap = 0.08,
  rx = 0.18,
  margin = 1,
  errorCorrectionLevel = "M",
}) {
  const { size, matrix } = useMemo(() => {
    try {
      const qr = QRCode.create(value, { errorCorrectionLevel });
      const s = qr.modules.size;
      const m = Array.from({ length: s }, (_, r) =>
        Array.from({ length: s }, (_, c) => Boolean(qr.modules.get(r, c)))
      );
      return { size: s, matrix: m };
    } catch (e) {
      console.error("Failed to generate QR code", e);
      return { size: 0, matrix: [] };
    }
  }, [value, errorCorrectionLevel]);

  if (!size) return null;

  const rects = [];
  const c = 1 - cellGap;
  const viewBoxSize = size + margin * 2;

  if (bgColor) {
    rects.push(
      <rect
        key="bg"
        x={0}
        y={0}
        width={viewBoxSize}
        height={viewBoxSize}
        fill={bgColor}
      />
    );
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j]) {
        rects.push(
          <rect
            key={`${i}-${j}`}
            x={j + margin + cellGap / 2}
            y={i + margin + cellGap / 2}
            width={c}
            height={c}
            rx={rx}
            fill={color}
          />
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className={className}
      role="img"
      aria-label="ChqIn QR"
      shapeRendering="crispEdges"
    >
      {rects}
    </svg>
  );
}

