// A simple brute-force solution

function solve() {
    const counters = [0];
    for (let i = 1; i <= 21; i++) {
        counters[i] = 0;
        for (let j = 1; ; j++) {
            const cube = BigInt(j) ** BigInt(i);
            const nDigits = cube.toString().length;
            if (nDigits === i) {
                // console.log(`${j}^${i} = ${cube}`);
                counters[i]++;
            } else if (nDigits > i) {
                break;
            }
        }

        if (counters[i] === 0) {
            break;
        }
    }

    console.log(counters.map((counter, index) => `${index}: ${counter}`).join("\n"));
    console.log(`Answer: ${counters.reduce((prev, cur) => prev + cur)}`);
}

console.time()
solve();
console.timeEnd();
