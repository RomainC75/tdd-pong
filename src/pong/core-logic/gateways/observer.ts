export type TGameState = {
    score: number
}

export interface IObserver {
    update(gameState: TGameState): void
}
export interface IObserved {
    attach(o: IObserver): void
    detach(o: IObserver): void
    notify(): void
}
