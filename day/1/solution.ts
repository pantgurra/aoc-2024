const inputParser = (input: string) =>
  input.split("\n").reduce<number[][]>(
    (acc, curr) => {
      const [list1, list2] = acc;
      const [to1, to2] = curr.split("   ");
      return [[...list1, Number(to1)].sort(), [...list2, Number(to2)].sort()];
    },
    [[], []]
  );

export const part1 = (input: string) => {
  const [left, right] = inputParser(input);

  return left.reduce<number>(
    (acc, curr, idx) =>
      acc + Math.max(curr, right[idx]) - Math.min(curr, right[idx]),
    0
  );
};

export const part2 = (input: string) => {
  const [left, right] = inputParser(input)

  return left.reduce<number>(
    (acc, curr) => acc + curr * right.filter((x) => x === curr).length,
    0
  );
};
