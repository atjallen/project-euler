function isPrime(n) {
    if (n === 0 || n === 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function getPrimes(n) {
    const sieve = Array(n + 1).fill(true);

    sieve[0] = false;
    sieve[1] = false;

    for (let i = 2; i < n; i++) {
        for (let j = i * 2; j <= n; j += i) {
            sieve[j] = false;
        }
    }

    return sieve.map((value, index) => [value, index]).filter((pair) => pair[0]).map((pair) => pair[1]);
}

function satisfies(primeSet, newPrime) {
    for (const prime of primeSet) {
        if (
            !isPrime(parseInt(prime + "" + newPrime))
            || !isPrime(parseInt(newPrime + "" + prime))
        ) {
            return false;
        }
    }

    return true;
}

function solve(n) {
    for (let i = 128; ; i *= 2) {
        const primes = getPrimes(i);
        function recurse(primeSet, lastI) {
            if (primeSet.length === n) {
                return primeSet;
            }

            for (let i = lastI + 1; i < primes.length; i++) {
                const newPrime = primes[i];
                if (satisfies(primeSet, newPrime)) {
                    const subResult = recurse([...primeSet, newPrime], i);
                    if (subResult) {
                        return subResult;
                    }
                }
            }
        }

        const result = recurse([], 0);
        if (result) {
            return result;
        }
    }
}

const input = parseInt(process.argv[2]) || 5;
console.time();
const solutionSet = solve(input);
console.log(`primes: ${solutionSet.join(", ")}`);
console.log(`solution: ${solutionSet.reduce((prev, cur) => prev + cur)}`);
console.timeEnd();
