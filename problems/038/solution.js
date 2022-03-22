// This is a simple brute-force solution which tries all numbers
// up to a certain limit and all possible sequences of 1, ..., n
// for each number

function isPandigital(n) {
    return n.toString().split("").sort().join("") === "123456789";
}

let largest = -1;
for (let i = 0; i < 10_000; i++) {
    let sumStr = "";
    let j;
    for (j = 1; j <= 9; j++) {
        sumStr += i * j;

        if (sumStr.length > 9) {
            continue;
        }

        if (sumStr.length === 9) {
            break;
        }
    }

    if (isPandigital(sumStr)) {
        // console.log(`${i} and (${[...Array(j).keys()].map((i) => i + 1)}): ${sumStr}`);
        const sum = parseInt(sumStr);
        if (sum > largest) {
            largest = sum;
        }
    }
}

console.log(largest);
