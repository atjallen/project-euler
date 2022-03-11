// Trivial brute-force solution using BigInt

function solve(n) {
    let sum = BigInt(0);
    for (let i = BigInt(1); i <= n; i++) {
        sum += i ** i;
    }
    return sum.toString().slice(-10)
}

const input = parseInt(process.argv[2]) || 1000;
console.log(solve(input));
