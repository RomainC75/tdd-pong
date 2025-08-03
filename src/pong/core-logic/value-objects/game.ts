import type { IObserved, IObserver } from "../gateways/observer";
import type { Snake, TPosition } from "./snake";


export class Game implements IObserved{
    private _boardDimensions: [number, number] = [300, 200];
    private _prey!: Prey;
    private _observers: IObserver[] = [];
    private _score = 0;

    constructor(
        private readonly _snake: Snake,
        private readonly _positionGenerator: IPositionGenerator,
    ) {
        this._initPrey()
        this._snake.setGame(this)
    }

    private _initPrey(){
        const position = this._positionGenerator.generate(this._boardDimensions, this._snake.positions)
        this._prey = new Prey(position);

    }

    play(): boolean{
        const collision = this._snake.move();
        if (collision){
            return true
        }
        return false
    }

    attach(observer: IObserver): void{
        this._observers.push(observer)
    }

    detach(observer: IObserver): void{
        const foundIndex = this._observers.indexOf(observer)
        if (foundIndex !== -1){
            console.log("subject not found")
            return
        }
        this._observers.splice(foundIndex, 1)
    }

    notify(): void {
        this._observers.forEach(o=>{
            o.update({
                score: this._score
            })
        })
    }

    get prey(): Prey{
        return this._prey;
    }

    scoreUp(){
        this._score ++
        this.notify()
        this._initPrey();
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
    expectedGeneratedPositions!: TPosition[];
    index = 0
    generate(boardDimensions: [number, number], snakePositions: TPosition[]): TPosition{
        const expectedGeneratedPosition = this.expectedGeneratedPositions[this.index];
        this.index = 1;
        return expectedGeneratedPosition
    }
}