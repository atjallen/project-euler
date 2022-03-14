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

function replaceChar(str, index, char) {
    const strArr = [...str];
    strArr[index] = char;
    return strArr.join("");
}

function getCombinations(array, r) {
    if (r === 1) {
        return array.map((elem) => [elem]);
    }

    if (array.length === r) {
        return [array];
    }

    const subCombsA = getCombinations(array.slice(1), r - 1)
        .map((comb) => [array[0], ...comb]);
    const subCombsB = getCombinations(array.slice(1), r);

    return subCombsA.concat(subCombsB);
}

// A brute-force solution which tests every number and checks
// whether replacing a certain number of digits in certain
// positions results in enough primes to satisfy the requirments
function solve(n) {
    const combinations = {};

    // Loop through the natural numbers
    for (let test = 0; ; test++) {
        // if (test % 1000 === 0) console.log(test);
        // Only consider primes
        if (isPrime(test)) {
            const testStr = test.toString();
            const testStrLen = testStr.length;
            // Consider replacing a certain number of digits in turn
            for (let nToRepl = 1; nToRepl <= testStrLen; nToRepl++) {
                // Cache combinations for test length choose n to replace
                if (!combinations[testStrLen]) combinations[testStrLen] = {};
                if (!combinations[testStrLen][nToRepl]) combinations[testStrLen][nToRepl] = getCombinations([...Array(testStrLen).keys()], nToRepl);

                // Check each combination
                for (const comb of combinations[testStrLen][nToRepl]) {
                    let primeCount = 0;
                    let answer;
                    // Check replacing with each digit
                    for (let i = 0; i <= 9; i++) {
                        // Don't consider replacement where the first digit
                        // is replaced with 0
                        if (i === 0 && comb[0] === 0) {
                            continue;
                        }

                        // Replace test digits in test string
                        let replacedStr = testStr;
                        for (const digit of comb) {
                            replacedStr = replaceChar(replacedStr, digit, i.toString());
                        }

                        // Check whether result is prime or not
                        const replaced = parseInt(replacedStr);
                        if (isPrime(replaced)) {
                            if (!answer) answer = replaced;
                            primeCount++;
                        }
                    }

                    // If answer found, print
                    if (primeCount === n) {
                        // console.log(`testStr = ${testStr}, comb = ${comb}`);
                        console.log(answer);
                        return;
                    }
                }
            }
        }
    }
}

const input = parseInt(process.argv[2]) || 8;
solve(input);
