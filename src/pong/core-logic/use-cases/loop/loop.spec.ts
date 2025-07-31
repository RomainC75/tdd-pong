import { describe, it, expect } from "vitest";
import { testCases } from "./cases";
import {
  BottomDirectionState,
  LeftDirectionState,
  RightDirectionState,
  Snake,
  State,
  TopDirectionState,
} from "../../value-objects/snake";

describe("loop test", () => {
  it("should init and go to the right", () => {
    const snake = new Snake([...testCases[0].init.positions]);
    snake.move();
    expect(snake.positions).to.deep.equal(testCases[0].expected.positions);
  });

  it.each`
    initSnakee           | expectedSnakee           | directionState
    ${testCases[1].init} | ${testCases[1].expected} | ${new TopDirectionState()}
    ${testCases[2].init} | ${testCases[2].expected} | ${new BottomDirectionState()}
    ${testCases[3].init} | ${testCases[3].expected} | ${new LeftDirectionState()}
  `(
    "should move the snake",
    ({
      initSnakee,
      expectedSnakee,
      directionState,
    }: {
      initSnakee: Snake;
      expectedSnakee: Snake;
      directionState: State;
    }) => {
      const snake = new Snake([...initSnakee.positions], directionState);

      snake.move();
      expect(snake.positions).to.deep.equal(expectedSnakee.positions);
    }
  );

  it.each`
    initSnake            | initDirectionState         | newDirection
    ${testCases[0].init} | ${new RightDirectionState()} | ${new LeftDirectionState()}
    ${testCases[1].init} | ${new TopDirectionState()} | ${new BottomDirectionState()}
    ${testCases[2].init} | ${new BottomDirectionState()} | ${new TopDirectionState()}
    ${testCases[3].init} | ${new LeftDirectionState()} | ${new RightDirectionState()}
  `(
    "should not change the direction if it's the opposite to the actual one",
    ({
      initSnake,
      initDirectionState,
      newDirection,
    }: {
      initSnake: Snake;
      initDirectionState: State;
      newDirection: State;
    }) => {
      const snake = new Snake([...initSnake.positions], initDirectionState);
      snake.setDirectionMvt(newDirection);
      expect(snake.movement?.directionCode).equal(initDirectionState.directionCode);
    }
  );
});
