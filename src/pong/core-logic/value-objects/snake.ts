import type { Game } from "./game";

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

export const BOARD_DIMENSIONS: [number, number] = [300, 200];

export class Snake {
  positions: TPosition[];
  movement: State = new RightDirectionState();
  game!: Game;

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

  private _isAutoCollision(): boolean{
    return this.positions.some((p1, i1, array)=>{
        return array.some((p2, i2)=>i1 != i2 && p1.x==p2.x && p1.y==p2.y)
    })
  }

  private _isWallCollision(): boolean{
    return this.positions.some(bodyPart => {
        return bodyPart.x < 0 || bodyPart.x >= BOARD_DIMENSIONS[0] || bodyPart.y < 0 || bodyPart.y >= BOARD_DIMENSIONS[1] 
    })
  }

  move(): boolean {
    const prey = this.game.prey;
    this.movement?.move(prey.position);
    return this._isAutoCollision() || this._isWallCollision()
  }

  setGame(game: Game){
    this.game = game;
  }
}

export abstract class State {
  protected snake!: Snake;
  protected snakePositionBuff!: TPosition;
  directionCode!: number;

  public setSnake(snake: Snake) {
    this.snake = snake;
  }

  public move(preyPosition: TPosition): void {
    this.snakePositionBuff = this.snake.positions[0];
    const newHeadPosition = this.newHeadPosition();
    if (newHeadPosition.x === preyPosition.x && newHeadPosition.y === preyPosition.y){
        this.snake.positions.unshift(newHeadPosition)
        this.snake.game.scoreUp()
    }else {
        this.snake.positions[0] = newHeadPosition
    }
    this._moveBody();
  }
  private _moveBody() {
    for (let i = 1; i < this.snake.positions.length; i++) {
      const buff = this.snake.positions[i];
      this.snake.positions[i] = this.snakePositionBuff;
      this.snakePositionBuff = buff;
    }
  }
  public abstract newHeadPosition(): TPosition;
}

export class RightDirectionState extends State {
  public readonly directionCode: number = 0;
  newHeadPosition() {
    return {
      x: this.snake.positions[0].x + 1,
      y: this.snake.positions[0].y,
    };
  }
}

export class TopDirectionState extends State {
  public readonly directionCode: number = 3;
  newHeadPosition() {
    return {
      x: this.snake.positions[0].x,
      y: this.snake.positions[0].y - 1,
    };
  }
}

export class BottomDirectionState extends State {
  public readonly directionCode: number = 1;
  newHeadPosition() {
    return {
      x: this.snake.positions[0].x,
      y: this.snake.positions[0].y + 1,
    };
  }
}

export class LeftDirectionState extends State {
  public readonly directionCode: number = 2;
  newHeadPosition() {
    return {
      x: this.snake.positions[0].x - 1,
      y: this.snake.positions[0].y,
    };
  }
}
