import fs from "fs";

const Part1 = async () => {
    // we have a list of reports a raport is an array of numbers
    const reports: number[][] = [];

    // we read the input from input.txt and fill the list of reports
    fs.readFile("./input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split("\n");
        lines.forEach((report) => {
            const numbers = report.split(" ").map(Number);
            reports.push(numbers);
        });

        let safeCount: number = 0;
        // we check each report and see it its safe or not
        reports.forEach((report) => {
            // we check if values only go up or only go down
            const strictlyIncreasing: boolean = report.every((value, index) => index === 0 || value >= report[index - 1]);
            const strictlyDecreasing: boolean = report.every((value, index) => index === 0 || value <= report[index - 1]);

            // we check if adjacent values differ at least 1 and at most 3
            const adjacentValuesDiffer: boolean = report.every((value, index) => index === 0 || (Math.abs(value - report[index - 1]) <= 3 && Math.abs(value - report[index - 1]) >= 1));

            // we check if the report is safe or not
            const safe: boolean = (strictlyIncreasing || strictlyDecreasing) && adjacentValuesDiffer;

            // we count how many are safe
            if (safe) safeCount++;
        });

        console.log("Part 1:", safeCount);
    })
};

const Part2 = async () => { };

Part1();
Part2();