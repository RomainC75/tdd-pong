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
  movement: State = new RightDirectionState();

  constructor(startingPositions: TPosition[], directionMvt?: State) {
    this.positions = startingPositions;
    
    if(directionMvt){
        this.movement = directionMvt;
    }
    this.movement?.setSnake(this);
  }

  setDirectionMvt(directionMvt: State) {
    if(this.movement!.directionCode%2 == directionMvt.directionCode%2){
        return
    }
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
  directionCode!: number;

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
  public readonly directionCode: number = 0;
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x + 1,
      y: this.snake.positions[0].y,
    };
  }
}

export class TopDirectionState extends State {
  public readonly directionCode: number = 3;
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x,
      y: this.snake.positions[0].y - 1,
    };
  }
}

export class BottomDirectionState extends State {
  public readonly directionCode: number = 1;
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x,
      y: this.snake.positions[0].y + 1,
    };
  }
}

export class LeftDirectionState extends State {
  public readonly directionCode: number = 2;
  moveHead() {
    this.snake.positions[0] = {
      x: this.snake.positions[0].x - 1,
      y: this.snake.positions[0].y,
    };
  }
}
