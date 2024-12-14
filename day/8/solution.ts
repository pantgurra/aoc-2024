interface Coordinates {
  x: number;
  y: number;
}

const coordinateSorter = (a: Coordinates, b: Coordinates) => {
  if (a.y < b.y) return -1;
  if (a.y > b.y) return 1;

  if (a.x < b.x) return -1;
  if (a.x > b.x) return 1;

  return 0;
};

const isOnMap =
  (rows: string[]) =>
  ({ x, y }: Coordinates) =>
    x > -1 && rows[y] && x < rows[y].length && y > -1 && y < rows.length;

const mapReducer = (rows: string[]) =>
  rows
    .map((row) => row.split(""))
    .reduce<Map<string, Coordinates[]>>((acc, row, y) => {
      const rowMap = row.reduce<Map<string, Coordinates[]>>(
        (coordinatesMap, char, x) => {
          if (char !== ".")
            return coordinatesMap.set(char, [
              ...(coordinatesMap.get(char) || []),
              { x, y },
            ]);
          return coordinatesMap;
        },
        new Map()
      );
      rowMap.forEach((value, key) => {
        acc.set(key, [...(acc.get(key) || []), ...value].sort(coordinateSorter));
      });
      return acc;
    }, new Map());

export const part1 = (input: string) => {
  const rows = input.split("\n");
  const map = mapReducer(rows);

  return [...map.values()].reduce<string[]>(
    (antinodes, row) => [
      ...new Set([
        ...antinodes,
        ...row
          .reduce<Coordinates[]>(
            (acc, { x, y }, ix) =>
              [
                ...acc,
                ...row
                  .filter((_, index) => index > ix)
                  .flatMap((o) => [
                    { y: y + (y - o.y), x: x + (x - o.x) },
                    { y: o.y - (y - o.y), x: o.x - (x - o.x) },
                  ]),
              ].filter(isOnMap(rows)),
            []
          )
          .map(({ x, y }) => `y${y}x${x}`),
      ]),
    ],
    []
  ).length;
};

export const part2 = (input: string) => {
  const rows = input.split("\n");
  const map = mapReducer(rows);

  return [...map.values()].reduce<string[]>(
    (antinodes, row) => [
      ...new Set([
        ...antinodes,
        ...row
          .reduce<Coordinates[]>(
            (acc, { x, y }, ix) =>
              [
                ...acc,
                ...row
                  .filter((_, index) => index > ix)
                  .flatMap((o) => {
                    let top = { x, y };
                    let bottom = o;
                    const coordinates: Coordinates[] = [top, bottom];
                    while (isOnMap(rows)(top) || isOnMap(rows)(bottom)) {
                      coordinates.push(
                        ...[
                          { y: top.y + (y - o.y), x: top.x + (x - o.x) },
                          { y: bottom.y - (y - o.y), x: bottom.x - (x - o.x) },
                        ]
                      );
                      top = { x: top.x + (x - o.x), y: top.y + (y - o.y) };
                      bottom = {
                        x: bottom.x - (x - o.x),
                        y: bottom.y - (y - o.y),
                      };
                    }
                    return coordinates;
                  }),
              ].filter(isOnMap(rows)),
            []
          )
          .map(({ x, y }) => `y${y}x${x}`),
      ]),
    ],
    []
  ).length;
};