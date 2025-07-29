import { describe, it, expect } from "vitest";
import { expectedSnake, initSnake } from "./cases";
import { Snake } from "../../value-objects/snake";


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
      const snake = new Snake(initSnake.positions);
      snake.move();
      expect(snake).to.deep.equal(expectedSnake)
    }
  );
});
