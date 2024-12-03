import fs from 'node:fs';

const data = fs.readFileSync('./data/2.txt', 'utf8').trim().split('\n');

function isSafe(levels: number[]) {
  let upOrDown = 0;
  for (let i = 1; i < levels.length; i++) {
    const delta = levels[i]! - levels[i - 1]!;
    if (upOrDown === 0 && delta !== 0) {
      upOrDown = Math.sign(delta);
    }
    const isSafeDelta =
      (upOrDown === 1 && delta >= 1 && delta <= 3) ||
      (upOrDown === -1 && delta <= -1 && delta >= -3);
    if (!isSafeDelta) {
      return false;
    }
  }
  return true;
}

// part 1
let safeCount = 0;
let safeCountWithDampener = 0;
for (const report of data) {
  const levels = report.split(/\s+/).map((l) => Number.parseInt(l, 10));
  if (isSafe(levels)) {
    safeCount++;
    continue;
  }

  for (let i = 0; i < levels.length; i++) {
    const maybeSafe = [...levels];
    maybeSafe.splice(i, 1);
    if (isSafe(maybeSafe)) {
      safeCountWithDampener++;
      break;
    }
  }
}
console.log(`Part 1: ${safeCount}`);

// part 2
console.log(`Part 2: ${safeCount + safeCountWithDampener}`);
