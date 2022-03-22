// This solution works by first generating all the permutations of the numbers
// 1-9 and then trying different splits of those permutations into multiplicands
// and multipliers to arrive at all the pandigital products

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

const permutations = getPermutations([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const panDigitalMultipliers = new Set();
for (const permutation of permutations) {
    for (let i = 1; i < permutation.length - 1; i++) {
        for (let j = i + 1; j < permutation.length; j++) {
            const multiplicandA = parseInt(permutation.slice(0, i).join(""));
            const multiplicandB = parseInt(permutation.slice(i, j).join(""));
            const multiplier = parseInt(permutation.slice(j).join(""));
            if (multiplicandA * multiplicandB === multiplier) {
                // console.log(`${multiplicandA} * ${multiplicandB} = ${multiplier}`);
                panDigitalMultipliers.add(multiplier);
            }
        }
    }
}

console.log([...panDigitalMultipliers].reduce((prev, cur) => prev + cur));
