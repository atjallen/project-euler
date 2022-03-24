function getNumDigits(n) {
    return n.toString().length;
}

function expand(n) {
    function recurse(n) {
        if (n <= 1) {
            return [BigInt(1), BigInt(2)];
        }

        const [num, denom] = recurse(n - 1);
        return [denom, num + BigInt(2) * denom];
    }

    const [num, denom] = recurse(n);
    return [num + denom, denom];
}

function solve() {
    let count = 0;
    for (let i = 1; i <= 1000; i++) {
        const [num, denom] = expand(i);
        if (getNumDigits(num) > getNumDigits(denom)) {
            count++;
        }
    }

    return count;
}

console.time();
console.log(solve());
console.timeEnd();
