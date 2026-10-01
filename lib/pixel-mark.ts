// The site mark: a pixel-art "M" on a 16×16 grid (retro, 8-bit style).
// Shared by the generated iPhone icon; app/icon.svg draws the same pixels.
const ROWS = [
  "##....##",
  "###..###",
  "##.##.##",
  "##....##",
  "##....##",
  "##....##",
  "##....##",
];
const OFFSET = { x: 4, y: 4 };

/** [x, y] of every lit pixel on the 16×16 grid. */
export const markPixels: [number, number][] = ROWS.flatMap((row, y) =>
  [...row].flatMap((c, x) => (c === "#" ? [[OFFSET.x + x, OFFSET.y + y] as [number, number]] : [])),
);
