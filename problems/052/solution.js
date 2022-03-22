function arePermutations(as, bs) {
    if (as.length !== bs.length) {
        return false;
    }

    as.sort();
    bs.sort();

    for (let i = 0; i < as.length; i++) {
        if (as[i] !== bs[i]) return false;
    }

    return true;
}

function haveSameDigits(a, b) {
    return arePermutations([...a.toString()], [...b.toString()]);
}

// A simple brute-force solution
for (let x = 1; ; x++) {
    if (
        haveSameDigits(x, 2 * x)
        && haveSameDigits(x, 3 * x)
        && haveSameDigits(x, 4 * x)
        && haveSameDigits(x, 5 * x)
        && haveSameDigits(x, 6 * x)
    ) {
        console.log(x);
        break;
    }
}
