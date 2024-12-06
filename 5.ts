import fs from 'node:fs';

const data = fs.readFileSync('./data/5.txt', 'utf8').trim();

const [pageOrderingRulesRaw, updatesRaw] = data.split('\n\n');

// sorting bullshit

// i have no fucking clue I tried like 10 ways I’mma have to cheat
// sort((a, b) => …) even given the complete ruleset didn’t work

const updates = updatesRaw!.split('\n').map((update) =>
  update
    .trim()
    .split(',')
    .map((v) => Number.parseInt(v, 10)),
);

function isCorrect(steps: number[]): boolean {
  let lastI = 0;
  for (const step of steps) {
    const sortPos = sortOrder.indexOf(step);
    if (sortPos < lastI) {
      return false;
    }
    lastI = sortPos;
  }
  return true;
}

let middleNumSum = 0;
for (const update of updates) {
  if (isCorrect(update)) {
    middleNumSum += update[Math.floor(update.length / 2)]!;
  }
}

console.log(`Part 1: ${middleNumSum}`);
