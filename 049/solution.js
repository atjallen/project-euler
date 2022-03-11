// A simple brute-force solution

function isPrime(n) {
    for (let i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function isPermutation(a, b) {
    return [...a.toString()].sort().join("") === [...b.toString()].sort().join("");
}

for (let i = 1000; i <= 9999; i++) {
    if (i === 1487) {
        continue;
    }

    const a = i;
    const b = i + 3330;
    const c = i + 3330 * 2;
    if (
        isPrime(a)
        && isPrime(b)
        && isPrime(c)
        && isPermutation(a, b)
        && isPermutation(a, c)
    ) {
        console.log(`a = ${a}, b = ${b}, c = ${c}, answer = ${a}${b}${c}`);
        break;
    }
}
