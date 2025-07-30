import { describe, it, expect } from "vitest";
import { expectedSnake, initSnake } from "./cases";
import {
  LeftDirectionState,
  RightDirectionState,
  Snake,
  State,
} from "../../value-objects/snake";

describe("loop test", () => {
  
  it("should init and go to the right", () => {
    const snake = new Snake([...initSnake.positions]);
    snake.move();
    expect(snake.positions).to.deep.equal(expectedSnake.positions);
  });

  it.each`
  initSnakee    | expectedSnakee    | directionState
  ${initSnake} | ${expectedSnake} | ${LeftDirectionState}
  `(
    "should move the snake",
    ({
      initSnakee,
      expectedSnakee,
      directionState,
    }: {
      initSnakee: Snake;
      expectedSnakee: Snake;
      directionSnake: State;
    }) => {
      const snake = new Snake([...initSnakee.positions]);
      snake.move();
      expect(snake.positions).to.deep.equal(expectedSnakee.positions);
    }
  );
});
