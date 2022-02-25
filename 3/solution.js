function getPrimes(n) {
    const sieve = Array(n + 1).fill(true);

    sieve[0] = false;
    sieve[1] = false;

    for (let i = 2; i < n; i++) {
        for (let j = i * 2; j < n; j += i) {
            sieve[j] = false;
        }
    }

    return sieve.map((value, index) => [value, index]).filter((pair) => pair[0]).map((pair) => pair[1]);
}

function solve(n) {
    primes = getPrimes(Math.floor(Math.sqrt(n)));
    primeFactors = primes.filter((prime) => n % prime === 0);
    return primeFactors[primeFactors.length - 1];
}

const input = parseInt(process.argv[2]) || 600851475143;
const solution = solve(input);
console.log(solution);
