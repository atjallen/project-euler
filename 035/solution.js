// A relatively self-evident brute-force solution

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

function isCircularPrime(n) {
    let nStr = n.toString();
    for (let i = 0; i < nStr.length; i++) {
        if (!isPrime(parseInt(nStr))) {
            return false;
        }

        nStr = nStr.substring(1) + nStr[0];
    }

    return true;
}

let count = 0;
for (let i = 0; i < 1_000_000; i++) {
    if (isCircularPrime(i)) {
        count++;
    }
}

console.log(count);
