export const part1 = (input: string) => {
  const matrix = [...input.split("\n").map((x) => x.split(""))];
  return matrix.reduce<number>((acc, curr, index) => {
    return (
      acc +
      curr.reduce<number>((iacc, icurr, ix) => {
        let occ = 0;
        if (icurr === "X") {
          if (
            curr[ix + 1] === "M" &&
            curr[ix + 2] === "A" &&
            curr[ix + 3] === "S"
          ) {
            occ += 1;
          }
          if (
            curr[ix - 1] === "M" &&
            curr[ix - 2] === "A" &&
            curr[ix - 3] === "S"
          ) {
            occ += 1;
          }
          if (
            matrix[index - 1]?.[ix] === "M" &&
            matrix[index - 2]?.[ix] === "A" &&
            matrix[index - 3]?.[ix] === "S"
          ) {
            occ += 1;
          }
          if (
            matrix[index + 1]?.[ix] === "M" &&
            matrix[index + 2]?.[ix] === "A" &&
            matrix[index + 3]?.[ix] === "S"
          ) {
            occ += 1;
          }
          if (
            matrix[index - 1]?.[ix - 1] === "M" &&
            matrix[index - 2]?.[ix - 2] === "A" &&
            matrix[index - 3]?.[ix - 3] === "S"
          ) {
            occ += 1;
          }
          if (
            matrix[index - 1]?.[ix + 1] === "M" &&
            matrix[index - 2]?.[ix + 2] === "A" &&
            matrix[index - 3]?.[ix + 3] === "S"
          ) {
            occ += 1;
          }
          if (
            matrix[index + 1]?.[ix - 1] === "M" &&
            matrix[index + 2]?.[ix - 2] === "A" &&
            matrix[index + 3]?.[ix - 3] === "S"
          ) {
            occ += 1;
          }
          if (
            matrix[index + 1]?.[ix + 1] === "M" &&
            matrix[index + 2]?.[ix + 2] === "A" &&
            matrix[index + 3]?.[ix + 3] === "S"
          ) {
            occ += 1;
          }
        }
        return iacc + occ;
      }, 0)
    );
  }, 0);
};

export const part2 = (input: string) => {
  const matrix = [...input.split("\n").map((x) => x.split(""))];
  return matrix.reduce<number>((acc, curr, index) => {
    return (
      acc +
      curr.reduce<number>((iacc, icurr, ix) => {
        let occ = 0;
        if (icurr === "M") {
          if (curr[ix + 2] === "S") {
            if (
              matrix[index + 1]?.[ix + 1] === "A" &&
              matrix[index + 2]?.[ix] === "M" &&
              matrix[index + 2]?.[ix + 2] === "S"
            ) {
              occ += 1;
            }
          }
          if (curr[ix - 2] === "S") {
            if (
              matrix[index + 1]?.[ix - 1] === "A" &&
              matrix[index + 2]?.[ix] === "M" &&
              matrix[index + 2]?.[ix - 2] === "S"
            ) {
              occ += 1;
            }
          }
          if (curr[ix + 2] === "M") {
            if (
              matrix[index + 1]?.[ix + 1] === "A" &&
              matrix[index + 2]?.[ix] === "S" &&
              matrix[index + 2]?.[ix + 2] === "S"
            ) {
              occ += 1;
            }
            if (
              matrix[index - 1]?.[ix + 1] === "A" &&
              matrix[index - 2]?.[ix] === "S" &&
              matrix[index - 2]?.[ix + 2] === "S"
            ) {
              occ += 1;
            }
          }
        }
        return iacc + occ;
      }, 0)
    );
  }, 0);
};
