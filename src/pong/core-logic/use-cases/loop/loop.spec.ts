import { describe, it, expect } from "vitest";
import { expectedSnake, initSnake } from "./cases";
import { RightDirectionState, Snake } from "../../value-objects/snake";


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
      const dmvt = new RightDirectionState();
      dmvt.setSnake(snake)
      snake.setDirectionMvt(dmvt);
      snake.move();
      expect(snake.positions).to.deep.equal(expectedSnake.positions)
    }
  );
});
