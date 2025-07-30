import { describe, it, expect } from "vitest";
import { testCases } from "./cases";
import { BottomDirectionState, LeftDirectionState, Snake, State, TopDirectionState } from "../../value-objects/snake";

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
      const snake = new Snake([...initSnakee.positions]);

      snake.setDirectionMvt(directionState);

      snake.move();
      expect(snake.positions).to.deep.equal(expectedSnakee.positions);
    }
  );
});
