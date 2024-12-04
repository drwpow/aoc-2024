import fs from 'node:fs';

const data = fs.readFileSync('./data/3.txt', 'utf8').trim();

const MUL_RE = /mul\(\d+,\d+\)/g;
const DONT_RE = /don't\(\)/g;
const DO_RE = /do\(\)/g;

function parseMul(input: string) {
  const nums = input
    .replace('mul(', '')
    .replace(')', '')
    .split(',')
    .map((v) => Number.parseFloat(v));
  if (nums.some((v) => !Number.isFinite(v))) {
    throw new Error(`Could not parse ${input}`);
  }
  return nums.reduce((current, next) => (current || 1) * next, 1);
}

let result = 0;
for (const mult of data.matchAll(MUL_RE)) {
  if (mult?.[0]) {
    result += parseMul(mult[0]);
  }
}

console.log(`Part 1: ${result}`);

let result2 = 0;
const dontPos = [...data.matchAll(DONT_RE).map((m) => m?.index)];
const doPos = [...data.matchAll(DO_RE).map((m) => m?.index)];
const ranges: [number, number][] = [];
for (const pos of dontPos) {
  if (ranges.some(([a, b]) => pos >= a && pos <= b)) {
    continue;
  }
  ranges.push([
    pos,
    doPos.find((pos2) => pos2 > pos) || Number.MAX_SAFE_INTEGER,
  ]);
}
let cleanedData = data.substring(0, ranges.pop()![0]); // start by shaving off last don't() till the end
for (let i = ranges.length - 1; i >= 0; i--) {
  const [a, b] = ranges[i]!;
  // shave out part in the middle between don't() and do()
  cleanedData = cleanedData.substring(0, a) + cleanedData.substring(b);
}
for (const mult of cleanedData.matchAll(MUL_RE)) {
  if (mult?.[0]) {
    result2 += parseMul(mult[0]);
  }
}

console.log(`Part 2: ${result2}`);
