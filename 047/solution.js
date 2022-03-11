// A simple brute force algorithm that tries all values
// until it finds the first value satisfying the requirements

function getPrimeFactors(n) {
    if (n === 0) {
        return [];
    }

    const factors = [];

    while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
    }

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
    }

    if (n > 2) {
        factors.push(n);
    }

    return factors;
}

function countDistinct(array) {
    return new Set(array).size;
}

function solve(n) {
    let foundCount = 0;
    for (let i = 0; ; i++) {
        if (countDistinct(getPrimeFactors(i)) === n) {
            foundCount++;
            if (foundCount === n) {
                return i - n + 1;
            }
        } else {
            foundCount = 0;
        }
    }
}

const input = parseInt(process.argv[2]) || 4;
console.log(solve(input));
