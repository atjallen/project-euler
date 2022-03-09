//  P_n = n(3n - 1)/2
// 2P_n = n(3n - 1)
//      = 3n^2 - n
// 3n^2 - n - 2P_n = 0
// n = (1 +- root(1 - 4*3*-2P_n))/2*3
//   = (1 +- root(1 + 24P_n))/6
// Therefore, n is a pentagonal number iff
// (1 +- root(1 + 24P_n))/6 is a positive integer
//
// A simple brute-force solution which tries progressive
// maximum values of n and checks all values of P_j and P_k
// less than that n until a solution is found. It's assumed
// the first solution will be the answer since the numbers
// only get larger as they get bigger so the difference
// between them will be larger

function isPentagonal(n) {
    const sqrtDeterminant = Math.sqrt(1 + 24 * n);
    const posRoot = (1 + sqrtDeterminant) / 6;
    const negRoot = (1 - sqrtDeterminant) / 6;
    return (Number.isInteger(posRoot) && posRoot >= 1)
        || (Number.isInteger(negRoot) && negRoot >= 1);
}

function getPentagonal(n) {
    return n * (3 * n - 1) / 2;
}

mainloop:
for (let max = 0; ; max += 100) {
    for (let j = 1; j <= max; j++) {
        for (let k = j; k <= max; k++) {
            const pJ = getPentagonal(j);
            const pK = getPentagonal(k);
            const sum = pJ + pK;
            const diff = pK - pJ;
            if (isPentagonal(sum) && isPentagonal(diff)) {
                console.log(`P_j = ${pJ}, P_k = ${pK}, diff = ${diff}`);
                break mainloop;
            }
        }
    }
}
