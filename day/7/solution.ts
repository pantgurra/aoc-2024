const getPossibleCombinations = (n: number, characters: string[]) => {
  const results: string[][] = [];
  const generateCombinations = (prefix: string[], length: number) => {
    if (length < 1) {
      results.push(prefix);
      return;
    }
    characters.forEach((char) => {
      generateCombinations([...prefix, char], length - 1);
    });
  };
  generateCombinations([], n);
  return results;
};

const calculator = (input: string, operators: string[]) =>
  input.split("\n").reduce<number>((result, equation) => {
    let testValue: number | string;
    let values: string | number[];
    [testValue, values] = equation.split(": ");
    testValue = Number(testValue);
    values = values.split(" ").map((v: string) => Number(v));
    return getPossibleCombinations(values.length - 1, operators).reduce<number>(
      (matches, operators) =>
        testValue ===
        values.reduce<number>((acc, value, ix) => {
          if (ix === 0) return value;
          if (operators[ix - 1] === "*") return acc * value;
          if (operators[ix - 1] === "||") return Number(`${acc}${value}`);
          return acc + value;
        }, 0)
          ? matches + 1
          : matches,

      0
    )
      ? result + testValue
      : result;
  }, 0);

export const part1 = (input: string) => calculator(input, ["+", "*"])
export const part2 = (input: string) => calculator(input, ["+", "*", "||"])
