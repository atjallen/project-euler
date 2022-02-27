function getProperDivisors(n) {
    const divisors = [1];
    let i;
    for (i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.push(i, n / i);
        }
    }

    if (i * i === n) {
        divisors.push(i);
    }

    return divisors;
}

class Character {
    static DEFICIENT = 1;
    static ABUNDANT = 2;
    static PERFECT = 3;
}

function getCharacter(n) {
    const sumOfProperDivisors = getProperDivisors(n).reduce((prev, cur) => prev + cur);
    if (sumOfProperDivisors < n) {
        return Character.DEFICIENT;
    }
    if (sumOfProperDivisors > n) {
        return Character.ABUNDANT;
    }
    return Character.PERFECT;
}

function getAbundantNumbers(max) {
    const abundantNums = [];
    for (let i = 1; i <= max; i++) {
        if (getCharacter(i) === Character.ABUNDANT) {
            abundantNums.push(i);
        }
    }
    return abundantNums;
}

const limit = 28123;
const abundantNums = getAbundantNumbers(limit);
const canBeWrittenAsSum = Array(limit + 1).fill(true);

for (const a of abundantNums) {
    for (const b of abundantNums) {
        if (a + b <= limit) {
            canBeWrittenAsSum[a + b] = false;
        }
    }
}

let sum = 0;
for (const [i, canBe] of canBeWrittenAsSum.entries()) {
    if (canBe) {
        sum += i;
    }
}

console.log(sum);
