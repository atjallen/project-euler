// Simple brute-force solution which checks all composites, primes and
// squares. Only checks squares and primes until they're larger than the
// composite they're being checked so as to short-circuit.

function getPrimesAndComposites(n) {
    const sieve = Array(n + 1).fill(true);

    sieve[0] = false;
    sieve[1] = false;

    for (let i = 2; i < n; i++) {
        for (let j = i * 2; j < n; j += i) {
            sieve[j] = false;
        }
    }

    const pairs = sieve.map((value, index) => [value, index]);
    const primes = pairs.filter((pair) => pair[0]).map((pair) => pair[1]);
    const composites = pairs.slice(2).filter((pair) => !pair[0]).map((pair) => pair[1]);
    return [primes, composites];
}

const [primes, composites] = getPrimesAndComposites(10_000);
mainloop:
for (const composite of composites) {
    if (composite % 2 === 1) {
        for (const prime of primes) {
            for (let s = 0; ; s++) {
                const sum = prime + 2 * s ** 2;

                if (sum === composite) {
                    continue mainloop;
                }

                if (sum > composite) {
                    break;
                }
            }

            if (prime > composite) {
                break;
            }
        }

        console.log(composite);
        break;
    }
}
