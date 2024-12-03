import fs from 'node:fs';

const data = fs.readFileSync('./data/1.txt', 'utf8').trim().split('\n');

const leftList = [];
const rightList = [];
for (const ln of data) {
  const [lRaw, rRaw] = ln.trim().split(/\s+/);
  const l = Number.parseInt(lRaw ?? '', 10);
  const r = Number.parseInt(rRaw ?? '', 10);
  if (!Number.isFinite(l) || !Number.isFinite(r)) {
    throw new Error(`Could not parse ${ln}`);
  }
  leftList.push(l);
  rightList.push(r);
}

// part 1
// we compare 2 sorted lists, and grab the difference between each key. first
// sort them, then run through once
const leftSorted = [...leftList].sort((a, b) => a - b);
const rightSorted = [...rightList].sort((a, b) => a - b);
let totalDiff = 0;
for (let i = 0; i < leftSorted.length; i++) {
  const l = leftSorted[i];
  const r = rightSorted[i];
  if (!l || !r) {
    throw new Error(`index ${i} out of range`);
  }
  totalDiff += Math.abs(l - r);
}
console.log(`Part 1: ${totalDiff}`);

// part 2
// iterate through the left list, and count the number of times that number
// appears in the right. but to speed things up, we can add up frequency counts
// in the right list first so we only need one pass over the right list, rather
// than leftList.length passes.
const frequencyCount = new Map<number, number>();
for (const n of rightList) {
  frequencyCount.set(n, (frequencyCount.get(n) || 0) + 1);
}
let similarityScore = 0;
for (const n of leftList) {
  const localScore = frequencyCount.get(n) ?? 0;
  similarityScore += n * localScore;
}
console.log(`Part 2: ${similarityScore}`);
