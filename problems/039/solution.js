// A simple brute-force solution that tries every possible
// combination of a b and c for every p and checks whether
// the combination satisfies Pythagoras' Theorem
// Pythagoras' Theorem: a^2 + b^2 = c^2
// Perimeter of a triangle: a + b + c = p

let largestP = -1;
let largestCount = -1;
for (let p = 3; p <= 1000; p++) {
    let solutionCount = 0;
    for (let a = 1; a <= p - 2; a++) {
        for (let b = a; b <= p - a - 1; b++) {
            const c = p - a - b;
            if (a ** 2 + b ** 2 === c ** 2) {
                // console.log(`{${a}, ${b}, ${c}}`);
                solutionCount++;
            }
        }
    }

    if (solutionCount > largestCount) {
        largestP = p;
        largestCount = solutionCount;
    }
}

console.log(largestP);
