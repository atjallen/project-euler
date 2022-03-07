// A relatively simple brute-force approach that starts
// from the highest potentially prime pandigital number
// and then counts down, checking each value for primality
// and pandigitality until it finds the first which is the
// largest
// Relies on the fact that no 9 or 8-digit pandigital primes
// are possible since they would both be divisible by 3 by
// nature of their digits

const MIN_MAX_GAP_DEFAULT = 1_000_000;

function getPrimes(max, min = max - MIN_MAX_GAP_DEFAULT) {
    min = Math.max(min, 0);

    const notPrimes = new Set();
    if (min <= 0) notPrimes.add(0);
    if (min <= 1) notPrimes.add(1);
    for (let i = 2; i <= max / 2; i++) {
        if (!notPrimes.has(i)) {
            for (let j = i * 2; j <= max; j += i) {
                if (j >= min) {
                    notPrimes.add(j);
                }
            }
        }
    }

    const primes = [];
    for (let i = min; i <= max; i++) {
        if (!notPrimes.has(i)) {
            primes.push(i);
        }
    }

    return primes;
}

function isPrime(n) {
    for (let i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function isPandigital(n) {
    const nStr = n.toString();
    const targetStr = [...Array(nStr.length).keys()].map((i) => i + 1).join("");
    return nStr.split("").sort().join("") === targetStr;
}

for (let i = 7_654_321; i >= 3; i -= 2) {
    if (isPrime(i) && isPandigital(i)) {
        console.log(i);
        break;
    }
}
