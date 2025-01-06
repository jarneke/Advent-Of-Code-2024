import * as fs from "fs";

const find = (grid: string[][], word: string): number => {
    // Counter
    let count: number = 0;
    // directions to look in
    const dir: [number, number][] = [
        [0, 1],  // right
        [0, -1], // left
        [1, 0],  // down
        [-1, 0], // up
        [1, 1],  // down right
        [1, -1], // down left
        [-1, 1], // up right
        [-1, -1] // up left
    ]
    /**
     * Function to check if in bounds
     * @param x coord one
     * @param y coord two
     * @returns true if in bounds, false if not
     */
    const isInBounds = (x: number, y: number): boolean => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
    /**
     * recursive function to search for word
     * @param x coord one
     * @param y coord two
     * @param direction direction to look in
     * @param index count for how many chars found
     */
    const search = (x: number, y: number, direction: [number, number], index: number): boolean => {
        // word found, exit recursion
        if (index === word.length) return true;
        // destructure direction
        const [dx, dy] = direction;
        // increment x and y in direction
        const nx = x + dx, ny = y + dy;

        // check if in bounds
        if (isInBounds(nx, ny) && grid[nx][ny] === word[index]) {
            // step deeper into recursion
            return search(nx, ny, direction, index + 1);
        }
        // word not found, exit recursion
        return false;
    }

    // loop through grid
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            // check if first char matches
            if (grid[x][y] === word[0]) {
                // search in all directions and increment count if found
                for (let d = 0; d < dir.length; d++) {
                    if (search(x, y, dir[d], 1)) count++;
                }
            }
        }
    }

    return count;
}
const checkXMAS = (x: number, y: number, input: string[][]): boolean => {
    // check if in bounds
    if (
        x - 1 >= 0 && y - 1 >= 0 && x + 1 < input.length && y + 1 < input[0].length &&
        x - 1 >= 0 && y + 1 < input[0].length && x + 1 < input.length && y - 1 >= 0
    ) {
        if (input[x][y] === 'A') {
            // check possible combinations of 'M' and 'S' and return true if found
            if (
                // M . S 
                // . A .
                // M . S
                (
                    input[x - 1][y - 1] === 'M' &&
                    input[x + 1][y - 1] === 'S' &&
                    input[x + 1][y + 1] === 'S' &&
                    input[x - 1][y + 1] === 'M'
                ) ||
                // M . M
                // . A .
                // S . S
                (
                    input[x - 1][y - 1] === 'M' &&
                    input[x + 1][y - 1] === 'M' &&
                    input[x + 1][y + 1] === 'S' &&
                    input[x - 1][y + 1] === 'S'
                ) ||
                // S . M
                // . A .
                // S . M
                (
                    input[x - 1][y - 1] === 'S' &&
                    input[x + 1][y - 1] === 'M' &&
                    input[x + 1][y + 1] === 'M' &&
                    input[x - 1][y + 1] === 'S'
                ) ||
                // S . S
                // . A .
                // M . M
                (
                    input[x - 1][y - 1] === 'S' &&
                    input[x + 1][y - 1] === 'S' &&
                    input[x + 1][y + 1] === 'M' &&
                    input[x - 1][y + 1] === 'M'
                )
            ) return true;
        }
    }
    return false;
}
const Part1 = async () => {
    // Word to find
    const word: string = "XMAS";
    // Read input
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // split input into 2d array of chars
        const input: string[][] = data.split("\n").map(line => line.split(""));

        console.log("Part 1:", find(input, word));
    })
}

const Part2 = async () => {
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // split input into 2d array of chars
        const input: string[][] = data.split("\n").map(line => line.split(""));

        // Counter for X-MAS patterns
        let count = 0;

        // Loop through grid
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
                // Look for 'A' in grid
                if (input[x][y] === 'A') {
                    // Check if X-MAS pattern is found
                    if (checkXMAS(x, y, input)) count++;
                }
            }
        }

        console.log("Part 2:", count);
    })
}

Part1();
Part2();
