function numDigits(n) {
    return n.toString().length;
}

function solve(nDigits) {
    let a = BigInt(1), b = BigInt(1);

    let i;
    for (i = 1; numDigits(a) < nDigits; i++) {
        const temp = b;
        b = a + b;
        a = temp;
    }

    return i;
}

const input = parseInt(process.argv[2]) || 1000;
const solution = solve(input);
console.log(solution);
