import fs from "fs";
/**
 * @param report a report is an array of numbers
 * @returns true if the report is safe, false if not.
 * We check if the report is safe or not by these 2 rules:
 * - values only go up or only go down
 * - adjacent values differ at least 1 and at most 3
 */
const CheckReport = (report: number[]): boolean => {
    // we check if values only go up or only go down
    const strictlyIncreasing: boolean = report.every((value, index) => index === 0 || value >= report[index - 1]);
    const strictlyDecreasing: boolean = report.every((value, index) => index === 0 || value <= report[index - 1]);

    // we check if adjacent values differ at least 1 and at most 3
    const adjacentValuesDiffer: boolean = report.every((value, index) => index === 0 || (Math.abs(value - report[index - 1]) <= 3 && Math.abs(value - report[index - 1]) >= 1));

    // we check if the report is safe or not and return it
    return (strictlyIncreasing || strictlyDecreasing) && adjacentValuesDiffer;
}
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
            if (CheckReport(report)) safeCount++;
        });

        console.log("Part 1:", safeCount);
    })
};

const Part2 = async () => {
    // we again get the reports
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
        // we again check each report like before
        reports.forEach((report) => {
            if (CheckReport(report)) safeCount++;
            // but if its unsafe, we check if we can make it safe by removing one value
            else {
                let newSafe: boolean = false;
                report.forEach((value, index) => {
                    const newReport = [...report];
                    newReport.splice(index, 1);
                    if (CheckReport(newReport)) {
                        newSafe = true;
                    }
                });
                if (newSafe) {
                    safeCount++;
                }
            }
        });

        console.log("Part 2:", safeCount);
    });
};

Part1();
Part2();