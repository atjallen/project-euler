let overallSum = 0;
for (let i = 2; i < 1_000_000; i++) {
    const digits = i.toString().split("");
    const sum = digits.reduce((prev, cur) => prev + cur ** 5, 0);
    if (sum === i) {
        overallSum += i;
    }
}

console.log(overallSum);
