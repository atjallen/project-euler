// By reversing the formula for the nth term of the sequence
// of triangle numbers, we find that
// t_n = n(n+1)/2
// 2t_n = n(n+1)
//      = n^2 + n
//      = (n + 1/2)^2 - 1/4
// (n + 1/2)^2 = 2t_n + 1/4
// n + 1/2 = +-root(2t_n + 1/4)
// n = 1/2 +- root(2t_n + 1/4)
//
// Therefore, n is a triangle number iff
// 1/2 +- root(2n + 1/4) is a positive integer
//
// The rest of the solution relies on simply getting
// every word's value and then checking whether that value
// is a triangle number of not

import fs from "fs";
import path from "path";

function isTriangleNumber(n) {
    const rootDiscriminant = Math.sqrt(2 * n + 0.25)
    const tPos = 0.5 + rootDiscriminant;
    const tNeg = 0.5 - rootDiscriminant;
    return (Number.isInteger(tPos) && tPos >= 1)
        || (Number.isInteger(tNeg) && tNeg >= 1);
}

function getWordValue(word) {
    return [...word]
        .map((char) => char.charCodeAt(0) - 64)
        .reduce((prev, cur) => prev + cur);
}

function isTriangleWord(word) {
    return isTriangleNumber(getWordValue(word));
}

const wordsFilepath = path.join(path.dirname(process.argv[1]), "words.txt");
const words = fs.readFileSync(wordsFilepath, {
    encoding: "utf-8",
}).replace(/"/g, "").split(",");

let count = 0;
for (const word of words) {
    if (isTriangleWord(word)) {
        count++;
    }
}

console.log(count);
