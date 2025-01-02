# Part One

General logic was alright, got stuck at the `Any two adjacent levels differ by at least one and at most three` for a bit.

I was doing:

```js
const adjacentValuesDiffer: boolean = report.every(
  (value, index) =>
    index === 0 ||
    Math.abs(value - report[index - 1]) <= 3 ||
    Math.abs(value - report[index - 1]) >= 1
); //(mixed up || and &&, wich lead to values <1 passing)
```

so if values were `<= 3` it would already return true and not check if it was `>= 1`

# Part Two

logic was easy, didnt really struggle here
