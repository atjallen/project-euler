// Trivial brute-force solution using BigInt
function solve(n) {
    let sum = BigInt(0);
    for (let i = BigInt(1); i <= n; i++) {
        sum += i ** i;
    }
    return sum.toString().slice(-10)
}

function trimToNumDigits(n, nDigits) {
    return parseInt(n.toString().slice(-nDigits));
}

// Slightly cleverer solution using masks to continually
// mask the last 10 digits and avoid overflows
function solve2(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        let product = 1;
        for (let j = 1; j <= i; j++) {
            product = trimToNumDigits(product * i, 10);
        }
        sum = trimToNumDigits(sum + product, 10);
    }
    return sum;
}

const input = parseInt(process.argv[2]) || 1000;
console.log(solve(input));
console.log(solve2(input));
