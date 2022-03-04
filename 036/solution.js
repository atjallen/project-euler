function isPalindrome(str) {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - i - 1]) {
            return false;
        }
    }

    return true;
}

let sum = 0;
for (let i = 0; i < 1_000_000; i++) {
    if (isPalindrome(i.toString(10)) && isPalindrome(i.toString(2))) {
        sum += i;
    }
}

console.log(sum);
