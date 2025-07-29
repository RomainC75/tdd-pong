import { describe, it, expect } from "vitest";
import { expectedSnake, initSnake } from "./cases";

export type TPosition = {
  x: number;
  y: number;
};

export type Snake = {
  positions: TPosition[];
  direction: number;
};



describe("loop test", () => {
  it.each`
    initSnake    | expectedSnake
    ${initSnake} | ${expectedSnake}
  `(
    "should move the snake",
    ({
      initSnake,
      expectedSnake,
    }: {
      initSnake: Snake;
      expectedSnake: Snake;
    }) => {
      const newSnake = move(initSnake);
      expect(newSnake).to.deep.equal(expectedSnake)
    }
  );
});

const move = (snake: Snake): Snake => {
  let snakePositionBuff: TPosition = snake.positions[0];
  if (snake.direction === 0) {
    snake.positions[0] = snake.positions[0] = {
      x: snake.positions[0].x + 1,
      y: snake.positions[0].y,
    };
  }
  for (let i = 1; i < snake.positions.length; i++) {
    const buff = snake.positions[i];
    snake.positions[i] = snakePositionBuff;
    snakePositionBuff = buff;
  }
  return snake;
};
