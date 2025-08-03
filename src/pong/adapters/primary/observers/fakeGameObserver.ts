import type { TGameState } from "../../../core-logic/gateways/observer";

export class FakeGameObserver {
    lastObserver?: TGameState
    update(gameState: TGameState): void {
        this.lastObserver = gameState
    }
}