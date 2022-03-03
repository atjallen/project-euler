// This solution works by computing the length of the reccuring cycles
// of all 1/n using short divison. When the short divison algorithm finds
// that a dividend is being used which has been used before, it concludes
// that the cycle has repeated and is therefore able to determine its length.

function getCycleLength(n) {
    const dividends = {};
    let dividend = 1;
    let i;
    for (i = 0; dividends[dividend] === undefined; i++) {
        dividends[dividend] = i;
        dividend = dividend % n * 10;
    }
    return i - dividends[dividend];
}

let longestD = -1;
let longestCycleLength = -1;
for (let d = 2; d < 1000; d++) {
    const cycleLength = getCycleLength(d);
    if (cycleLength > longestCycleLength) {
        longestD = d;
        longestCycleLength = cycleLength;
    }
}

console.log(longestD);
console.log(longestCycleLength);
