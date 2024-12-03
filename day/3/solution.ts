export const part1 = (input: string) =>
  input.match(/mul[(]\d{1,3},\d{1,3}[)]/g)?.reduce<number>((acc, curr) => {
    const [first, second] = curr.match(/\d{1,3}/g)?.map((x) => Number(x)) || [];
    return acc + first * second;
  }, 0);

export const part2 = (input: string) => {
  let disabled = false;
  return input
    .match(/(mul[(]\d{1,3},\d{1,3}[)]|do[(][)]|don't[(][)])/g)
    ?.reduce<number>((acc, curr) => {
      switch (curr) {
        case "don't()":
          disabled = true;
          return acc;
        case "do()":
          disabled = false;
          return acc;
        default:
          if (disabled) return acc;
          const [first, second] =
            curr.match(/\d{1,3}/g)?.map((x) => Number(x)) || [];
          return acc + first * second;
      }
    }, 0);
};
