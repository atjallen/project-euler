// An intelligent solution which uses algebra to work out whether
// a number is a figurate number and then uses that information
// to progressively work out whether a set of numbers satisfies
// the requirments. It's intelligent because it only proceeds with
// checking if all the previous numbers are valid and it only checks
// numbers that start with the first two digits of the previous number
// 
// The working for determining whether a number is figurate is as follows:
// y = x(ax + b)/c
// ax^2 + bx - cy = 0
// x = (-b +- root(b^2 + 4acy))/2a

function isFigurate(n, a, b, c) {
    return Number.isInteger((-b + Math.sqrt(b ** 2 + 4 * a * c * n)) / (2 * a));
}

function isTriangle(n) {
    return isFigurate(n, 1, 1, 2);
}

function isSquare(n) {
    return isFigurate(n, 1, 0, 1);
}

function isPentagonal(n) {
    return isFigurate(n, 3, -1, 2);
}

function isHexagonal(n) {
    return isFigurate(n, 2, -1, 1);
}

function isHeptagonal(n) {
    return isFigurate(n, 5, -3, 2);
}

function isOctagonal(n) {
    return isFigurate(n, 3, -2, 1);
}

const tests = [
    isTriangle,
    isSquare,
    isPentagonal,
    isHexagonal,
    isHeptagonal,
    isOctagonal,
];

const solutions = [];

function recurse(tests, numbers) {
    // If we have run out of tests to check
    if (tests.length === 0) {
        // Check whether the first two digits of the first number
        // are equal to the last two digits of the last number
        const firstTwo = numbers[0][0].toString().substring(0, 2);
        const lastTwo = numbers[5][0].toString().substring(2);
        if (firstTwo === lastTwo) {
            // If so, this is a solution
            solutions.push(numbers);
        }

        return;
    }

    // Determine which numbers to check based on the last two digits
    // of the previous number
    let min = 1010, max = 9999;
    if (numbers.length !== 0) {
        const thisNumberStart = numbers[numbers.length - 1][0].toString().substring(2);
        min = parseInt(`${thisNumberStart}10`);
        max = parseInt(`${thisNumberStart}99`);
    }

    // Check all numbers
    for (let thisNumber = min; thisNumber <= max; thisNumber++) {
        // Skip checking numbers which would result in the next numbers
        // starting with 0
        if (thisNumber.toString()[2] === "0") {
            continue;
        }

        // Test the number with each of the remaining tests
        for (const [idx, test] of tests.entries()) {
            if (test(thisNumber)) {
                // Recursively call the function with the reamining
                // tests and the new number
                const nextTests = [...tests];
                nextTests.splice(idx, 1);
                recurse(nextTests, [...numbers, [thisNumber, test.name.substring(2).toLowerCase()]]);
            }
        }
    }
}

console.time();
recurse(tests, []);
console.log(solutions[0]);
console.log(solutions[0].reduce((prev, cur) => prev + cur[0], 0));
console.timeEnd();
