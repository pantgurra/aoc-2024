import { part1, part2 } from "./solution"

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

test("d2p1", () => {
  expect(part1(input)).toBe(2)
})

test("d2p2", () => {
  expect(part2(input)).toBe(4)
})