import fs from "fs"

function charToValue(c) {
    return c.charCodeAt(0) - 64;
}

function stringToValue(s) {
    return [...s].map(charToValue).reduce((prev, cur) => prev + cur);
}

const namesFilepath = process.argv[2];
const names = fs.readFileSync(namesFilepath, {
    encoding: "utf-8",
}).replace(/"/g, "").split(",");

names.sort();

const totalScore = names.map((name, index) => (index + 1) * stringToValue(name)).reduce((prev, cur) => prev + cur);
console.log(totalScore);
