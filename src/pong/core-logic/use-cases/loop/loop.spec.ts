import { describe, it, expect } from "vitest";
import { Ball } from "../../value-objects/ball";
import { Game } from "../../value-objects/game";

export type TPosition = {
  x: number;
  y: number;
};

describe("loop test", () => {
  const tableSize: [number, number] = [300, 200];
  //
  it.each`
    ballPosition           | ballDirection        | ballSpeed | ballNextExpectedPosition                                                | expectedBallDirection
    ${{ x: 20, y: 10 }}    | ${0}                 | ${1}      | ${{ x: 21, y: 10 }}                                                     | ${0}
    ${{ x: 20, y: 10 }}    | ${Math.PI / 2}       | ${1}      | ${{ x: 20, y: 11 }}                                                     | ${Math.PI / 2}
    ${{ x: 20, y: 10 }}    | ${Math.PI}           | ${1}      | ${{ x: 19, y: 10 }}                                                     | ${Math.PI}
    ${{ x: 20, y: 10 }}    | ${(Math.PI * 3) / 2} | ${1}      | ${{ x: 20, y: 9 }}                                                      | ${(Math.PI * 3) / 2}
    ${{ x: 299.5, y: 10 }} | ${0}                 | ${1}      | ${{ x: 299.5, y: 10 }}                                                  | ${Math.PI}
    ${{ x: 299.5, y: 10 }} | ${Math.PI / 4}       | ${1}      | ${{ x: 2 * tableSize[0] - (299.5 + Math.cos(Math.PI / 4) * 1), y: 10 + Math.sin(Math.PI/4) * 1 }} | ${Math.PI - Math.PI / 4}
  `(
    "should move the ball",
    ({
      ballPosition,
      ballDirection,
      ballSpeed,
      ballNextExpectedPosition,
      expectedBallDirection,
    }: {
      ballPosition: TPosition;
      ballDirection: number;
      ballSpeed: number;
      ballNextExpectedPosition: TPosition;
      expectedBallDirection: number;
    }) => {
      const ball = new Ball(ballPosition, ballDirection, ballSpeed);
      const game = new Game(ball, tableSize);
      game.move();
      expect(ball.position).toEqual(ballNextExpectedPosition);
      expect(ball.direction).toEqual(expectedBallDirection);
    }
  );
});
