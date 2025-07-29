import type { TPosition } from "../use-cases/loop/loop.spec";

export enum EDirection {
  Right = "right",
  Left = "left",
  Bottom = "bottom",
  Top = "top",
}

export type TPosition = {
  x: number;
  y: number;
};

export class Snake {
  positions: TPosition[];
  direction: EDirection;
  movement: State | undefined;

  constructor(startingPositions: TPosition[]) {
    this.positions = startingPositions;
    this.direction = EDirection.Right;

  }

  setDirectionMvt(directionMvt: State) {
    this.movement = directionMvt;
    return this;
  }

  move() {
    this.movement?.move();
  }
}

export abstract class State {
  protected snake!: Snake;

  public setSnake(snake: Snake) {
    this.snake = snake;
  }

  public abstract move(): void;
}

export class RightDirectionState extends State {
  
  public move(): void {
    let snakePositionBuff: TPosition = this.snake.positions[0];
    if (this.snake.direction === EDirection.Right) {
      this.snake.positions[0] = {
        x: this.snake.positions[0].x + 1,
        y: this.snake.positions[0].y,
      };
    }
    for (let i = 1; i < this.snake.positions.length; i++) {
      const buff = this.snake.positions[i];
      this.snake.positions[i] = snakePositionBuff;
      snakePositionBuff = buff;
    }
  }
}
