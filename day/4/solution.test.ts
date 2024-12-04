import { part1, part2 } from "./solution";

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
test("d4p1", () => {
  expect(part1(input)).toBe(18)
});

test("d4p2", () => {
  expect(part2(input)).toBe(9)
})
