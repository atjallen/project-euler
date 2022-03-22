function isPrime(n) {
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

// A simple brute-force solution in O(n^3)
function solve(n) {
    const primes = getPrimes(n);

    let longest = -1;
    let longestLength = -1;
    mainloop:
    for (let i = 0; i < primes.length; i++) {
        const testPrime = primes[i];
        for (let j = 0; j < i; j++) {
            let sum = 0;
            for (let k = j; k < i; k++) {
                sum += primes[k];

                if (sum > testPrime) {
                    break;
                }

                const seqLength = k - j + 1;
                if (sum === testPrime && seqLength > longestLength) {
                    longest = testPrime;
                    longestLength = seqLength;
                    continue mainloop;
                }
            }
        }
    }

    console.log(`longest = ${longest}, length = ${longestLength}`);
}

// A slightly improved O(n^2) solution which tests different
// potential sequence lengths and all the possible sequences
// within those lengths
function solve2(n) {
    const primes = getPrimes(n);

    let longest = -1;
    let longestLength = -1;
    let longestStart = -1;
    for (let seqLength = 1; seqLength <= primes.length; seqLength++) {
        for (let start = 0; start < primes.length - seqLength + 1; start++) {
            const sum = primes
                .slice(start, start + seqLength)
                .reduce((prev, cur) => prev + cur);

            if (sum > n) {
                break;
            }

            if (isPrime(sum)) {
                longest = sum;
                longestLength = seqLength;
                longestStart = start;
                break;
            }
        }
    }

    console.log(`longest = ${longest}, length = ${longestLength}`);
}

const input = parseInt(process.argv[2]) || 999_999;
solve2(input);
