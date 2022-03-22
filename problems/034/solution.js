// This is a simple brute-force solution that tries all numbers up to a certain bound

function factorial(n) {
    let product = 1;
    for (let i = 2; i <= n; i++) {
        product *= i;
    }
    return product;
}

for (let i = 10; i < 10_000_000; i++) {
    const digits = i.toString().split("").map((n) => parseInt(n));
    const sumOfFactorials = digits.map(factorial).reduce((prev, cur) => prev + cur);
    if (sumOfFactorials === i) {
        console.log(`${digits.map((n) => n + "!").join(" + ")} = ${i}`);
    }
}
