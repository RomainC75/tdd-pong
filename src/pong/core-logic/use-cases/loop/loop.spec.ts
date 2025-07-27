import { describe, it, expect } from "vitest";

type TPosition = {
  x: number;
  y: number;
};

describe("loop test", () => {
  const tableSize: { length: number; height: number } = {
    length: 300,
    height: 200,
  };

  it.each`
    ballPosition        | ballDirection  | ballSpeed | ballNextExpectedPosition
    ${{ x: 20, y: 10 }} | ${0}           | ${1}      | ${{ x: 21, y: 10 }}
    ${{ x: 20, y: 10 }} | ${Math.PI / 2} | ${1}      | ${{ x: 20, y: 11 }}
    ${{ x: 20, y: 10 }} | ${Math.PI}     | ${1}      | ${{ x: 19, y: 10 }}
    ${{ x: 20, y: 10 }} | ${Math.PI * 3/2}     | ${1}      | ${{ x: 20, y: 9 }}
  `(
    "should move the ball",
    ({
      ballPosition,
      ballDirection,
      ballSpeed,
      ballNextExpectedPosition,
    }: {
      ballPosition: TPosition;
      ballDirection: number;
      ballSpeed: number;
      ballNextExpectedPosition: TPosition;
    }) => {
      expect(
        calculateNextPosition(ballPosition, ballDirection, ballSpeed)
      ).toEqual(ballNextExpectedPosition);
    }
  );
});

const calculateNextPosition = (
  ball: TPosition,
  direction: number,
  speed: number
): TPosition => {
    return {
      x: ball.x + Math.cos(direction) * speed,
      y: ball.y + Math.sin(direction) * speed,
    };
};
