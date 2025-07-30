import { EDirection, type TPosition } from "../../value-objects/snake";

export type SnakeData = {
  positions: TPosition[];
  direction: EDirection;
};

export const initSnake: SnakeData = {
  positions: [
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
  ],
  direction: EDirection.Right,
};


export type TCase = {
  name: string;
  init: SnakeData;
  expected: SnakeData;
};

export const testCases: TCase[] = [
  {
    name: "move to the right",
    init: initSnake,
    expected: {
      positions: [
        { x: 6, y: 3 },
        { x: 5, y: 3 },
        { x: 4, y: 3 },
      ],
      direction: EDirection.Right,
    },
  },
  {
    name: "move to the top",
    init: initSnake,
    expected: {
      positions: [
        { x: 5, y: 2 },
        { x: 5, y: 3 },
        { x: 4, y: 3 },
      ],
      direction: EDirection.Right,
    },
  },
];
