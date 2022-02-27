function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}

let permutations = 0;

function permute(array, start) {
    // console.log(`permute(${array}, ${start})`);
    array = [...array];

    if (start === array.length - 1) {
        permutations++;

        if (permutations === 1_000_000) {
            console.log(array);
        }

        return;
    }

    for (let i = start; i < array.length; i++) {
        swap(array, start, i);
        permute(array, start + 1);
    }
}

const input = parseInt(process.argv[2]) || 10;
permute([...Array(input).keys()], 0);
