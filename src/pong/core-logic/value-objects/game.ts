import type { Ball } from "./ball";

export class Game {
    private _ball: Ball;
    private _boardDimensions: [number, number];

    constructor(ball: Ball, boardDimensions: [number, number]){
        this._ball = ball
        this._boardDimensions = boardDimensions
    }

    move(){
        this._ball.move(this._boardDimensions)
    }
}