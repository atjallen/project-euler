// A simple brute-force solution using BigInt

function getDigitalSum(n) {
    return [...n.toString()]
        .map((digit) => parseInt(digit))
        .reduce((prev, cur) => prev + cur);
}

function solveBruteForce(n) {
    let max = -1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const sum = getDigitalSum(BigInt(i) ** BigInt(j));
            if (sum > max) {
                max = sum;
            }
        }
    }

    return max;
}

const input = parseInt(process.argv[2]) || 100;
console.time();
console.log(solveBruteForce(input));
console.timeEnd();
