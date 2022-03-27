// A simple brute-force algorithm

import path from "path";
import fs from "fs";

const dir = path.dirname(process.argv[1]);
const cipher = fs.readFileSync(path.join(dir, "cipher.txt"), "utf-8")
    .split(",")
    .map((value) => parseInt(value));

const aCharCode = "a".charCodeAt(0);
const zCharCode = "z".charCodeAt(0);
for (let a = aCharCode; a <= zCharCode; a++) {
    for (let b = aCharCode; b <= zCharCode; b++) {
        for (let c = aCharCode; c <= zCharCode; c++) {
            const key = [a, b, c];
            const message = [];
            for (let i = 0; i < cipher.length; i += key.length) {
                for (let j = 0; j < key.length; j++) {
                    message.push(cipher[i + j] ^ key[j]);
                }
            }

            const messageStr = String.fromCharCode(...message);
            if (
                messageStr.includes("the")
                && messageStr.includes("and")
                && messageStr.includes("of")
                && messageStr.includes("from")
            ) {
                console.log(message.reduce((prev, cur) => prev + cur));
            }
        }
    }
}
