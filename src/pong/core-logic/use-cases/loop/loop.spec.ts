import { describe, it, expect } from "vitest";
import {
  initSnakeLeft,
  initSnakeRight,
  longSnakeTestCases,
  testCases,
} from "./cases";
import {
  BottomDirectionState,
  LeftDirectionState,
  RightDirectionState,
  Snake,
  State,
  TopDirectionState,
  type TPosition,
} from "../../value-objects/snake";
import { FakePositionGenerator, Game } from "../../value-objects/game";
import { FakeGameObserver } from "../../../adapters/primary/observers/fakeGameObserver";

describe("loop test", () => {
  it("should init and go to the right", () => {
    const snake = new Snake([...testCases[0].init.positions]);

    const fakePositionGenerator = new FakePositionGenerator();

    fakePositionGenerator.expectedGeneratedPosition = { x: 15, y: 15 };
    const game = new Game(snake, fakePositionGenerator);
    game.play();

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
      const fakePositionGenerator = new FakePositionGenerator();

      fakePositionGenerator.expectedGeneratedPosition = { x: 10, y: 4 };
      const game = new Game(snake, fakePositionGenerator);

      game.play();
      expect(snake.positions).to.deep.equal(expectedSnakee.positions);
    }
  );

  it.each`
    initSnake            | initDirectionState            | newDirection
    ${testCases[0].init} | ${new RightDirectionState()}  | ${new LeftDirectionState()}
    ${testCases[1].init} | ${new TopDirectionState()}    | ${new BottomDirectionState()}
    ${testCases[2].init} | ${new BottomDirectionState()} | ${new TopDirectionState()}
    ${testCases[3].init} | ${new LeftDirectionState()}   | ${new RightDirectionState()}
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
      expect(snake.movement?.directionCode).equal(
        initDirectionState.directionCode
      );
    }
  );

  it("should detect a collision if the snake hits himself", () => {
    const snake = new Snake(
      [...longSnakeTestCases[0].expected.positions],
      new TopDirectionState()
    );

    const fakePositionGenerator = new FakePositionGenerator();
    fakePositionGenerator.expectedGeneratedPosition = { x: 10, y: 4 };

    const game = new Game(snake, fakePositionGenerator);
    const collision = game.play();

    expect(collision).equal(true);
  });

  it.each`
    initSnake            | initDirectionState
    ${testCases[1].init} | ${new TopDirectionState()}
    ${testCases[3].init} | ${new LeftDirectionState()}
  `(
    "should detect a collision if the snake hits a wall",
    ({
      initSnake,
      initDirectionState,
    }: {
      initSnake: Snake;
      initDirectionState: State;
    }) => {
      const snake = new Snake([...initSnake.positions], initDirectionState);

      const fakePositionGenerator = new FakePositionGenerator();
      fakePositionGenerator.expectedGeneratedPosition = { x: 10, y: 4 };

      const game = new Game(snake, fakePositionGenerator);
      game.play();
      game.play();
      game.play();
      const collision = game.play();

      expect(collision).equal(true);
    }
  );

  it.each`
    initSnake         | initDirectionState            | preyPosition
    ${initSnakeRight} | ${new RightDirectionState()}  | ${{ x: 6, y: 3 }}
    ${initSnakeRight} | ${new TopDirectionState()}    | ${{ x: 5, y: 2 }}
    ${initSnakeRight} | ${new BottomDirectionState()} | ${{ x: 5, y: 4 }}
    ${initSnakeLeft}  | ${new LeftDirectionState()}   | ${{ x: 2, y: 3 }}
  `(
    "should get longer if eats a fruit",
    ({
      initSnake,
      initDirectionState,
      preyPosition,
    }: {
      initSnake: Snake;
      initDirectionState: State;
      preyPosition: TPosition;
    }) => {
      const snake = new Snake([...initSnake.positions], initDirectionState);
      const fakePositionGenerator = new FakePositionGenerator();
      fakePositionGenerator.expectedGeneratedPosition = preyPosition;

      const game = new Game(snake, fakePositionGenerator);

      game.play();
      expect(snake.positions.length).equal(
        testCases[0].init.positions.length + 1
      );
      // ! the prey should disapear
    }
  );
  
  it("should score a point if the snake eats the prey", () => {
    const snake = new Snake(
      [...initSnakeRight.positions],
      new RightDirectionState()
    );
    const fakePositionGenerator = new FakePositionGenerator();
    fakePositionGenerator.expectedGeneratedPosition = { x: 6, y: 3 };

    const game = new Game(snake, fakePositionGenerator);

    const fakeGameObserver = new FakeGameObserver();
    game.attach(fakeGameObserver);

    game.play();

    expect(fakeGameObserver.lastObserver).to.deep.equal({
      score: 1,
    });
  });
});
