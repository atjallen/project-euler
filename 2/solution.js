function solve(max) {
    let sum = 0;

    let a = 1, b = 2;
    while (a < max) {
        if (a % 2 === 0) {
            sum += a;
        }

        const temp = a + b;
        a = b;
        b = temp;
    }

    return sum;
}

const input = parseInt(process.argv[2]) || 4_000_000;
const solution = solve(input);
console.log(solution);
