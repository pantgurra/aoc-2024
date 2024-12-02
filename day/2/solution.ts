enum DifferenceType {
  INCREASE = 1,
  DECREASE,
  UNSAFE,
}

const differenceTypeDecider = ([first, second]: number[]): DifferenceType => {
  const comparator = first - second;
  if (comparator > 0) return DifferenceType.DECREASE;
  if (comparator < 0) return DifferenceType.INCREASE;
  return DifferenceType.UNSAFE;
};

const isSafe = (line: number[]) => {
  const differenceType = differenceTypeDecider(line);
  const safeChecker = (val: number) => 0 < val && val < 4;
  return (
    differenceType !== DifferenceType.UNSAFE &&
    line.every((val, index) => {
      if (index === 0) return true;
      if (differenceType === DifferenceType.DECREASE)
        return safeChecker(line[index - 1] - val);
      if (differenceType === DifferenceType.INCREASE)
        return safeChecker(val - line[index - 1]);
      return false;
    })
  );
};

export const part1 = (input: string) =>
  input.split("\n").reduce<number>((acc, curr) => {
    const line = curr.split(" ").map((val) => Number(val));
    return isSafe(line) ? acc + 1 : acc;
  }, 0);

export const part2 = (input: string) =>
  input.split("\n").reduce<number>((acc, curr) => {
    const line = curr.split(" ").map((val) => Number(val));
    return isSafe(line) ||
      line.some((_, index) =>
        isSafe([...line.slice(0, index), ...line.slice(index + 1)])
      )
      ? acc + 1
      : acc;
  }, 0);
