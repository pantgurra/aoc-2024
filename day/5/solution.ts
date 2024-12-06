const data = (input: string) => {
  const [ruleString, updateString] = input.split("\n\n");
  const rules = ruleString
    .split("\n")
    .map((rule) => rule.split("|").map((x) => Number(x)));
  const updates = updateString.split("\n");
  return { rules, updates };
};

const validator = (update: number[], rules: number[][]) =>
  !update.some((number, index) =>
    rules
      .filter((rule) => rule.some((numb) => numb === number))
      .some((rule) => update.slice(0, index).includes(rule[1]))
  );

export const part1 = (input: string) => {
  const { rules, updates } = data(input);

  return updates.reduce<number>((acc, curr) => {
    const update = curr.split(",").map((x) => Number(x));
    const isValid = validator(update, rules);
    if (isValid) return acc + (update.at(update.length / 2) || 0);
    return acc;
  }, 0);
};

export const part2 = (input: string) => {
  
  const sorter = (rules: number[][]) => (a: number, b: number) => {
    const [dominant] = rules.find((rule) =>
      rule.every((r) => [a, b].includes(r))
    ) || [];
    if (a === dominant) {
      return 1;
    } else if (b === dominant) {
      return -1;
    }
    return 0;
  };

  const { rules, updates } = data(input);

  return updates
    .filter(
      (update) =>
        !validator(
          update.split(",").map((x) => Number(x)),
          rules
        )
    )
    .map((update) => update.split(",").map((x) => Number(x)))
    .reduce<number>(
      (acc, curr) =>
        acc +
        (curr
          .sort(
            sorter(
              rules.filter((rule) =>
                rule.every((number) => curr.includes(number))
              )
            )
          )
          .at(curr.length / 2) || 0),
      0
    );
};
