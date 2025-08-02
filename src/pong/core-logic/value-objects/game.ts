import type { Snake, TPosition } from "./snake";

export class Game {
    private _boardDimensions: [number, number] = [300, 200];
    private _prey!: Prey;
    constructor(
        private readonly _snake: Snake,
        private readonly _positionGenerator: IPositionGenerator,
    ) {
        this._initPrey()
    }

    private _initPrey(){
        const position = this._positionGenerator.generate(this._boardDimensions, this._snake.positions)
        this._prey = new Prey(position);

    }

    play(): boolean{
        const collision = this._snake.move(this._prey.position);
        if (collision){
            return true
        }
        return false
    }
}

export class Prey {
    constructor(
        private _position: TPosition
    ){}
    get position(): TPosition{
        return this._position;
    }
}


export interface IPositionGenerator {
    generate(boardDimensions: [number, number], snakePositions: TPosition[]): TPosition
}

export class FakePositionGenerator  implements IPositionGenerator{
    expectedGeneratedPosition!: TPosition;
    generate(boardDimensions: [number, number], snakePositions: TPosition[]): TPosition{
        return this.expectedGeneratedPosition
    }
}