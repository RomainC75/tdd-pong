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

export const expectedSnake: SnakeData= {
  positions: [
    { x: 6, y: 3 },
    { x: 5, y: 3 },
    { x: 4, y: 3 },
  ],
  direction: EDirection.Right,
};