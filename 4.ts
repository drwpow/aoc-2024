import fs from 'node:fs';

const data = fs.readFileSync('./data/4.txt', 'utf8').trim();

export interface Coord {
  x: number;
  y: number;
}

const rows = data.split('\n');
const dataGrid = rows.map((r) => r.split(''));

function checkWord(word: string, start: Coord, end: Coord): boolean {
  if (
    typeof dataGrid[start.y]?.[start.x] !== 'string' ||
    typeof dataGrid[end.y]?.[end.x] !== 'string'
  ) {
    return false;
  }
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  for (let step = 0; step < word.length; step++) {
    const x = start.x + deltaX * (step / (word.length - 1));
    const y = start.y + deltaY * (step / (word.length - 1));
    const letter = word.at(step);
    if (dataGrid[y]?.[x] !== letter) {
      return false;
    }
  }
  return true;
}

let xmasCount = 0;
const WORD = 'XMAS';
for (let y = 0; y < dataGrid.length; y++) {
  const row = dataGrid[y]!;
  for (let x = 0; x < row.length; x++) {
    if (dataGrid[y]?.[x] !== WORD.at(0)) {
      continue;
    }
    const shift = WORD.length - 1;
    const direction = [
      { x, y: y - shift }, // up
      { x: x + shift, y: y - shift }, // up-right
      { x: x + shift, y }, // right
      { x: x + shift, y: y + shift }, // down-right
      { x, y: y + shift }, // down
      { x: x - shift, y: y + shift }, // down-left
      { x: x - shift, y }, // left
      { x: x - shift, y: y - shift }, // up-left
    ];
    for (const end of direction) {
      if (checkWord(WORD, { x, y }, end)) {
        xmasCount++;
      }
    }
  }
}

console.log(`Part 1: ${xmasCount}`);

let masExCount = 0;
for (let y = 0; y < dataGrid.length; y++) {
  const row = dataGrid[y]!;
  for (let x = 0; x < row.length; x++) {
    // fuck you AoC I thought I was SoooOOooOOO smart in part 1 but NoooOOOoO you have to thwart me
    if (dataGrid[y]?.[x] !== 'A') {
      continue;
    }
    // fuck it, hardcodin
    const counts: Record<string, number> = {};
    for (const c of [
      dataGrid[y - 1]?.[x - 1], // top-left
      dataGrid[y - 1]?.[x + 1], // top-right
      dataGrid[y + 1]?.[x + 1], // bottom-right
      dataGrid[y + 1]?.[x - 1], // bottom-left
    ]) {
      if (!c) {
        break;
      }
      counts[c] = (counts[c] ?? 0) + 1;
    }
    if (counts.M === 2 && counts.S === 2) {
      masExCount++;
    }
  }
}

console.log(`Part 2: ${masExCount}`);
