import {part1, part2} from "./solution";

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

test("d1p1", () => {
  expect(part1(input)).toBe(11);
});

test("d1p2", () => {
  expect(part2(input)).toBe(31);
});
