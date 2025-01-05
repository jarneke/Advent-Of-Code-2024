import * as fs from "fs";

const getMultipliedNumbers = (data: string): number => {
    // replace the mul(...) with nothing and split the numbers
    const [num1, num2]: string[] = data.replace("mul(", "").replace(")", "").split(",");
    // parse the numbers
    const n1 = Number(num1);
    const n2 = Number(num2);
    // calculate the result and save it
    return n1 * n2;
}
const Part1 = async () => {
    // Read input
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // setup regex to find all mul(..., ...) instances
        const regex = /mul\([\d]{1,3},[\d]{1,3}\)/g;
        // find all matches
        const matches: RegExpMatchArray[] = [...data.matchAll(regex)];
        // list to store the multiplied numbers
        const multipliedNumbers: number[] = [];
        matches.forEach(matchArr => {
            // get the match and throw away the rest
            const [match, _, __]: RegExpMatchArray = matchArr;
            // calculate the result and save it
            multipliedNumbers.push(getMultipliedNumbers(match));
        })

        // calculate the sum of the multiplied numbers
        const sum = multipliedNumbers.reduce((a, b) => a + b, 0);
        console.log("Part 1:", sum);
    });
}

const Part2 = async () => {
    // Read input
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // setup regex to find all do(), don't() and mul(..., ...) instances
        const regex = /(do\(\))|(don't\(\))|(mul\([\d]{1,3},[\d]{1,3}\))/g;
        // find all matches
        const matches: RegExpMatchArray[] = [...data.matchAll(regex)];
        // list to store the multiplied numbers
        const multipliedNumbers: number[] = [];
        // bool to store if do or don't is active
        let doActive: boolean = true;
        matches.forEach(matchArr => {
            // get the match and throw away the rest
            const [match, _, __]: RegExpMatchArray = matchArr;
            // see if the match is a do or don't
            if (match === "do()") {
                doActive = true;
                return;
            }
            else if (match === "don't()") {
                doActive = false;
                return;
            }

            if (doActive) {
                // calculate the result and save it
                multipliedNumbers.push(getMultipliedNumbers(match));
            }
        })

        // calculate the sum of the multiplied numbers
        const sum = multipliedNumbers.reduce((a, b) => a + b, 0);
        console.log("Part 2:", sum);
    });
}

Part1();
Part2();