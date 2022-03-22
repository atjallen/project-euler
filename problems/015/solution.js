function solveBruteForce(width, height) {
    width += 1;
    height += 1;

    function recurse(x, y) {
        if (x === width - 1 && y === height - 1) {
            return 1;
        }

        if (x >= width || y >= height) {
            return 0;
        }

        return recurse(x + 1, y) + recurse(x, y + 1);
    }

    return recurse(0, 0);
}

function solveDynamic(width, height) {
    width += 1;
    height += 1;

    // Initialise lattice
    const lattice = Array(height);
    for (let i = 0; i < height; i++) {
        lattice[i] = Array(width);
    }

    lattice[0][0] = 1;

    // Determine path counts via dynamic programming
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (i === 0 && j === 0) {
                continue;
            }

            const leftPathCount = lattice[i][j - 1] ?? 0;
            const abovePathCount = lattice[i - 1]?.[j] ?? 0;
            lattice[i][j] = leftPathCount + abovePathCount;
        }
    }

    // for (const row of lattice) {
    //     console.log(row.join(" "));
    // }

    return lattice[height - 1][width - 1];
}

const width = parseInt(process.argv[2]) || 20;
const height = parseInt(process.argv[3]) || width;
const solution = solveDynamic(width, height);
console.log(solution);
