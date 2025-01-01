//imports
import * as fs from "fs";

const main = async () => {
    // we have 2 lists
    const list1: number[] = [];
    const list2: number[] = [];

    // we fill the lists with the input we read from input.txt
    fs.readFile("./input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split("\n");
        lines.forEach((line) => {
            const [num1, num2] = line.split("   ");
            list1.push(Number(num1));
            list2.push(Number(num2));
        });

        // we sort the lists in ascending order
        list1.sort((a, b) => a - b);
        list2.sort((a, b) => a - b);

        // for each index of the lists, we compare the numbers and find the distance between them
        const distances: number[] = [];
        list1.forEach((num1, index) => {
            const num2 = list2[index];
            distances.push(Math.abs(num1 - num2));
        });

        // we then add all of the distances together
        const sum = distances.reduce((a, b) => a + b, 0);

        // now we should have the solution
        console.log(sum);
    })
}

main();
