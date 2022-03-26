// A relatively simple solution that generates all the numbers
// on the diagonals of the square spirals, checks whether they're
// prime and progressively calculates the ratio to determine when
// it drops below 10%
//
// The numbers on the diagonals of the square spiral follow
// the following pattern:
// Start with 1
// Add 2 four times to get the next four numbers
// Add 4 four times to get the next four numbers
// Add 6 four times to get the next four numbers
// And so on...

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

function solve(threshold) {
    let counter = 1;
    let primeCounter = 0;
    let current = 1;
    for (let i = 1; ; i++) {
        for (let j = 0; j < 4; j++) {
            current += i * 2;
            if (isPrime(current)) {
                primeCounter++;
            }
            counter++;
        }

        if (primeCounter / counter < threshold) {
            return 2 * i + 1;
        }
    }
}

const input = parseFloat(process.argv[2]) || 0.1;
console.time();
console.log(solve(input));
console.timeEnd();
