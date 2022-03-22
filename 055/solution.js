// A simple brute-force solution

function isPalindrome(a) {
    const aStr = a.toString();
    for (let i = 0; i < aStr.length / 2; i++) {
        if (aStr[i] !== aStr[aStr.length - 1 - i]) {
            return false;
        }
    }

    return true;
}

function reverse(n) {
    return parseInt([...n.toString()].reverse().join(""));
}

function isLychrel(n) {
    let cur = n;
    for (let i = 0; i < 50; i++) {
        const sum = cur + reverse(cur);
        if (isPalindrome(sum)) {
            return false;
        }

        cur = sum;
    }

    return true;
}

let count = 0;
for (let i = 0; i < 10_000; i++) {
    if (isLychrel(i)) {
        count++;
    }
}

console.log(count);
