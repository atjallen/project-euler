// A simple brute-force solution

function factorial(n) {
    if (n === 0) {
        return 1;
    }

    let product = 1;
    for (let i = 1; i <= n; i++) {
        product *= i;
    }

    return product;
}

function choose(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

let count = 0;
for (let n = 1; n <= 100; n++) {
    for (let r = 0; r <= n; r++) {
        if (choose(n, r) > 1_000_000) {
            count++;
        }
    }
}

console.log(count);
