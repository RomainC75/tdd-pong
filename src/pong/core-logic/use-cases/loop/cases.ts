import type { Snake } from "./loop.spec";

export const initSnake: Snake = {
  positions: [
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
  ],
  direction: 0,
};

export const expectedSnake: Snake = {
  positions: [
    { x: 6, y: 3 },
    { x: 5, y: 3 },
    { x: 4, y: 3 },
  ],
  direction: 0,
};