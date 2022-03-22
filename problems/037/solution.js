function isPrime(n) {
    if (n === 0 || n === 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function isTruncatablePrime(n) {
    const nStr = n.toString();
    for (let i = 0; i < nStr.length; i++) {
        if (
            !isPrime(parseInt(nStr.substring(i)))
            || !isPrime(parseInt(nStr.substring(0, nStr.length - i)))
        ) {
            return false;
        }
    }

    return true;
}

let sum = 0;
for (let i = 10; i < 1_000_000; i++) {
    if (isTruncatablePrime(i)) {
        sum += i;
    }
}

console.log(sum);
