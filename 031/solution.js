// This is essentially a brute-force algorithm but with an optimisation.
// It is brute force in that it just tries every possible combination of
// coins to reach the target amount. However, it has an opimisation in that
// it only checks combinations whose coins are ordered in descending order.
// This is because we do not care about the ordering of the coins only their
// value (e.g. [100, 50, 50] = [50, 50, 100]) so we don't need to check every
// combination only the descending combinations. This makes the algorithm fast
// enough to be practicable.

const coins = [200, 100, 50, 20, 10, 5, 2, 1];

function solve(amount, coins) {
    let ways = 0;
    function recurse(cur, coinsI) {
        const sum = cur.reduce((prev, cur) => prev + cur, 0);
        if (sum >= amount) {
            if (sum === amount) {
                ways++;
            }

            return;
        }

        for (let i = coinsI; i < coins.length; i++) {
            recurse([...cur, coins[i]], i);
        }
    }

    recurse([], 0);

    return ways;
}

console.log(solve(200, coins));
