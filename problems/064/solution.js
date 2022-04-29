// A simple algorithm which computes the sequence
// of continued fractions and checks to see when
// a repeat occurs

function getPeriod(n) {
    // b / (sqrt(n) - c)
    let a = Math.floor(Math.sqrt(n));
    let b = 1;
    let c = a;
    const seq = [];
    // While this combination of a, b and c has not been seen before
    while (!seq.some(([ea, eb, ec]) => ea === a && eb === b && ec === c)) {
        seq.push([a, b, c]);

        // Compute the next values of a, b and c
        a = Math.floor(b / (Math.sqrt(n) - c));
        b = (n - c ** 2) / b;
        c = -(c - a * b);
    }

    return seq.length - 1;
}

function solve(n) {
    let counter = 0;
    for (let i = 2; i <= n; i++) {
        // Only consider non-squares
        if (!Number.isInteger(Math.sqrt(i))) {
            const period = getPeriod(i);
            // console.log(`${i}: ${period}`);
            if (period % 2 === 1) {
                counter++;
            }
        }
    }

    console.log(counter);
}

const input = parseInt(process.argv[2]) || 10_000;
console.time();
solve(input);
console.timeEnd();
