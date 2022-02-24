function solve(n) {
    let sum = 0;

    for (let i = 0; i < n; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            sum += i;
        }
    }

    return sum;
}

const input = parseInt(process.argv[2]) || 1000;
const solution = solve(input);
console.log(solution);
