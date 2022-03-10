function getTriangle(n) {
    return n * (n + 1) / 2;
}

function getPentagonal(n) {
    return n * (3 * n - 1) / 2;
}

function getHexagonal(n) {
    return n * (2 * n - 1);
}

const start = 144;
let t = start, p = start, h = start;
let tri, pen, hex;
do {
    hex = getHexagonal(h++);
    do {
        pen = getPentagonal(p++)
        do {
            tri = getTriangle(t++);
        } while (tri < pen);
    } while (pen < hex);
} while (tri !== pen || tri !== hex);

console.log(`t = ${t - 1}, p = ${p - 1}, h = ${h - 1}, number = ${tri}`);
