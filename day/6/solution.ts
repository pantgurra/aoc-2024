enum Direction {
  UP = 1,
  RIGHT,
  DOWN,
  LEFT,
}

interface Coordinates {
  x: number;
  y: number;
}

const data = (input: string) => {
  const map = [...input.split("\n")];
  const initY = map.findIndex((str) => str.includes("^"));
  const initX = map[initY].indexOf("^");
  let point = { x: initX, y: initY };
  const obstacles = map.flatMap((row, y) =>
    [...row.matchAll(/#/g)].map(({ index: x }) => ({ x, y }))
  );

  return { map, point, obstacles };
};

const pathCalculator = (
  obstructions: Coordinates[],
  initialPoint: Coordinates,
  map: string[]
) => {
  let point = initialPoint;
  let direction: Direction = Direction.UP;

  const isOnMap = ({ x, y }: Coordinates) =>
    x > -1 && map[y] && x < map[y].length && y > -1 && y < map.length;

  let __count = 0;
  const __detectInfiniteLoop = () => {
    if (__count > 10000) {
      throw new Error("Infinite Loop");
    }
    __count += 1;
  };

  const path = new Set();
  while (isOnMap(point)) {
    __detectInfiniteLoop();
    path.add(`x${point.x}y${point.y}`);
    switch (direction) {
      case Direction.UP: {
        if (
          obstructions.find(({ x, y }) => x === point.x && y === point.y - 1)
        ) {
          direction = Direction.RIGHT;
        } else {
          point = { ...point, y: point.y - 1 };
        }
        break;
      }
      case Direction.DOWN: {
        if (
          obstructions.find(({ x, y }) => x === point.x && y === point.y + 1)
        ) {
          direction = Direction.LEFT;
        } else {
          point = { ...point, y: point.y + 1 };
        }
        break;
      }
      case Direction.RIGHT: {
        if (
          obstructions.find(({ x, y }) => y === point.y && x === point.x + 1)
        ) {
          direction = Direction.DOWN;
        } else {
          point = { ...point, x: point.x + 1 };
        }
        break;
      }
      case Direction.LEFT: {
        if (
          obstructions.find(({ x, y }) => y === point.y && x === point.x - 1)
        ) {
          direction = Direction.UP;
        } else {
          point = { ...point, x: point.x - 1 };
        }
      }
    }
  }
  return path;
};

export const part1 = (input: string) => {
  const { obstacles, point, map } = data(input);
  try {
    return pathCalculator(obstacles, point, map).size;
  } catch {
    console.log("Input Data Error");
  }
};

export const part2 = (input: string) => {
  const { obstacles, point, map } = data(input);
  const free = map.flatMap((row, y) =>
    [...row.matchAll(/./g)].map(({ index: x }) => ({ x, y }))
  );

  return free.reduce<number>((acc, curr) => {
    const obstructions = [...obstacles, curr];
    try {
      pathCalculator(obstructions, point, map);
      return acc;
    } catch (error) {
      return acc + 1;
    }
  }, 0);
};
