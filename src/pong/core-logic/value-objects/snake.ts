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

    constructor(startingPositions: TPosition[]){
        this.positions = startingPositions;
        this.direction = EDirection.Right;
    }

    move(): void {
        let snakePositionBuff: TPosition = this.positions[0];
        if (this.direction === EDirection.Right) {
            this.positions[0] = {
                x: this.positions[0].x + 1,
                y: this.positions[0].y,
            };
        }
        for (let i = 1; i < this.positions.length; i++) {
            const buff = this.positions[i];
            this.positions[i] = snakePositionBuff;
            snakePositionBuff = buff;
        }
    }
}