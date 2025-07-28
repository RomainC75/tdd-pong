import type { TPosition } from "../use-cases/loop/loop.spec";

export class Ball {
  private _position: TPosition;
  private _direction: number;
  private _speed: number;

  constructor(position: TPosition, direction: number, speed: number) {
    this._position = position;
    this._direction = direction;
    this._speed = speed;
  }

  get position(): TPosition {
    return this._position;
  }

  get direction(): number {
    return this._direction;
  }

  move(boardDimensions: [number, number]) {
    const nextBallPosition = {
      x: this._position.x + Math.cos(this._direction) * this._speed,
      y: this._position.y + Math.sin(this._direction) * this._speed,
    };
    if (nextBallPosition.x > boardDimensions[0]) {
      nextBallPosition.x = boardDimensions[0] - (nextBallPosition.x - boardDimensions[0])
      if(this._direction < Math.PI/2){
        this._direction = Math.PI - this._direction
        console.log("-> new direction : ", this._direction)
      }
    }
    this._position = nextBallPosition
  }
}
