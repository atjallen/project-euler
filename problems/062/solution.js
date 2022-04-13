// A relatively simple brute-force solution which checks an increasing list of
// n numbers to see whether their cubes are permutations of each other or not

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

function solve(n) {
    function recurse(nums) {
        // If we have found the required amount of cubes permutations,
        // we have found a soltution
        if (nums.length === n) {
            return nums;
        }

        const last = nums[nums.length - 1];
        const lastCube = last ** 3;
        // Start from the last value so we get an increasing list
        for (let i = last + 1; ; i++) {
            const cube = i ** 3;

            // Exit out of the loop when the cube is longer in length
            // than the previous cube, since it can no longer be a
            // permutation
            if (cube.toString().length > lastCube.toString().length) {
                break;
            }

            // If this cube is a permutation of the previous cube,
            // add it to the list and check the next cube
            if (haveSameDigits(cube, lastCube)) {
                const result = recurse([...nums, i]);
                if (result) {
                    return result;
                }
            }
        }
    }

    for (let i = 0; ; i++) {
        const result = recurse([i]);
        if (result) {
            console.log(result.map((num) => `${num ** 3} (${num}^3)`).join(", "));
            console.log(`Answer: ${result[0] ** 3}`);
            return;
        }
    }
}

const input = parseInt(process.argv[2]) || 5;
console.time();
solve(input);
console.timeEnd();
