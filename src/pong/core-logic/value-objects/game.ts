import type { Snake } from "./snake";

export class Game {
    constructor(
        private readonly _snake: Snake
    ) {

    }

    play(): boolean{
        return this._snake.move();
    }
}