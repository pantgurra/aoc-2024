import { part1, part2 } from "./solution";

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
test("d6p1", () => {
  expect(part1(input)).toBe(41)
});
test("d6p2", () => {
  expect(part2(input)).toBe(6)
});
