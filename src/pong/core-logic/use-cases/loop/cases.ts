import { type TPosition } from "../../value-objects/snake";

export type SnakeData = {
  positions: TPosition[];
};

export const initSnakeRight: SnakeData = {
  positions: [
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
  ],
};

export const initSnakeLeft: SnakeData = {
  positions: [
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
  ],
};

export type TCase = {
  name: string;
  init: SnakeData;
  expected: SnakeData;
};

export const testCases: TCase[] = [
  {
    name: "move to the right",
    init: initSnakeRight,
    expected: {
      positions: [
        { x: 6, y: 3 },
        { x: 5, y: 3 },
        { x: 4, y: 3 },
      ],
    },
  },
  {
    name: "move to the top",
    init: initSnakeRight,
    expected: {
      positions: [
        { x: 5, y: 2 },
        { x: 5, y: 3 },
        { x: 4, y: 3 },
      ],
    },
  },
  {
    name: "move to the bottom",
    init: initSnakeRight,
    expected: {
      positions: [
        { x: 5, y: 4 },
        { x: 5, y: 3 },
        { x: 4, y: 3 },
      ],
    },
  },
  {
    name: "move to the left",
    init: initSnakeLeft,
    expected: {
      positions: [
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
      ],
    },
  },
];

export const longSnakeTestCases: TCase[] = [
  {
    name: "long - move to the top",
    init: initSnakeLeft,
    expected: {
      positions: [
        { x: 2, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
    },
  },
];
