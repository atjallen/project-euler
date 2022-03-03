// This solution works by simply considering every combination of
// two-digit numerators and denominators, checking whether they
// have a digit in common and, if so, testing whether the fraction
// produced when that digit is removed is equal to the initial fraction

for (let n = 10; n <= 99; n++) {
    for (let d = n + 1; d <= 99; d++) { // only want to consider fractions less than 1
        const nDigits = [...n.toString()];
        const dDigits = [...d.toString()];
        for (let nI = 0; nI < 2; nI++) {
            for (let dI = 0; dI < 2; dI++) {
                if (nDigits[nI] === dDigits[dI] && nDigits[nI] !== "0") { // don't want to consider trivial fractions
                    const newN = parseInt(nDigits.slice((nI + 1) % 2, (nI + 1) % 2 + 1).join(""));
                    const newD = parseInt(dDigits.slice((dI + 1) % 2, (dI + 1) % 2 + 1).join(""));
                    if (n * newD === newN * d) {
                        console.log(`${n}/${d} = ${newN}/${newD}`); // the final solution is computed by hand
                    }
                }
            }
        }
    }
}
