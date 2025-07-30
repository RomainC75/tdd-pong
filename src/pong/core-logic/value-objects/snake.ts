
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

    this.setDirectionMvt(new RightDirectionState());
    this.movement?.setSnake(this);
  }

  setDirectionMvt(directionMvt: State) {
    this.movement = directionMvt;
    this.movement?.setSnake(this);
    return this;
  }

  move() {
    this.movement?.move();
  }
}

export abstract class State {
  protected snake!: Snake;
  protected snakePositionBuff!: TPosition;

  public setSnake(snake: Snake) {
    this.snake = snake;
  }

  public move(): void {
    this.snakePositionBuff = this.snake.positions[0];
    this.moveHead();
    this._moveBody();
  }
  private _moveBody() {
    for (let i = 1; i < this.snake.positions.length; i++) {
      const buff = this.snake.positions[i];
      this.snake.positions[i] = this.snakePositionBuff;
      this.snakePositionBuff = buff;
    }
  }
  public abstract moveHead(): void;
}

export class RightDirectionState extends State {
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x + 1,
      y: this.snake.positions[0].y,
    };
  }
}

export class TopDirectionState extends State {
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x,
      y: this.snake.positions[0].y -1,
    };
  }
}

export class BottomDirectionState extends State {
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x,
      y: this.snake.positions[0].y +1,
    };
  }
}

export class LeftDirectionState extends State {
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x-1,
      y: this.snake.positions[0].y,
    };
  }
}