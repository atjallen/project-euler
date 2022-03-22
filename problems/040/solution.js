// A simple solution which simply counts the natural numbers
// and keeps track of how many digits of the fractional part
// have been considered. When it reaches one of the target
// digits it multiplies that to the rolling product to arrive
// at the solution.

let digitCount = 0;
let n = 1;
let product = 1;
for (let i = 1; ; i++) {
    const iStr = i.toString();
    const newDigitcount = digitCount + iStr.length;
    if (newDigitcount >= n) {
        product *= parseInt(iStr[n - digitCount - 1]);

        n *= 10;
        if (n > 1_000_000) {
            break;
        }
    }

    digitCount = newDigitcount;
}

console.log(product);
