function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}

function getPermutations(array) {
    const permutations = [];
    function permute(array, index) {
        if (index === array.length - 1) {
            permutations.push(array);
            return;
        }

        for (let i = index; i < array.length; i++) {
            swap(array, index, i);
            permute([...array], index + 1);
        }
    }

    permute(array, 0);

    return permutations;
}

const divisors = [2, 3, 5, 7, 11, 13, 17];
const pandigitalPerms = getPermutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
let sum = 0;
mainloop:
for (const pandigitalPerm of pandigitalPerms) {
    for (let i = 0; i < divisors.length; i++) {
        const sub = parseInt(pandigitalPerm.slice(i + 1, i + 4).join(""));
        if (sub % divisors[i] !== 0) {
            continue mainloop;
        }
    }

    sum += parseInt(pandigitalPerm.join(""));
}

console.log(sum);
