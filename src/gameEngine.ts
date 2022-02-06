import { CharacterProperties, Target } from "./helper";

type CallbackGameEngine = () => void
export class Engine {
  private readonly runnigThread: CallbackGameEngine[];
  private character: CharacterProperties;
  private _targets: Target[] = [];

  constructor(refreshTimer = 20){
    this.runnigThread = [];
    setInterval(() => {
      for (const callback of this.runnigThread) {
        callback();
      }
    }, refreshTimer)
  }

  get targets(): Target[] {
    return this._targets
  }

  public addGamingThread(callback: CallbackGameEngine): void {
    this.runnigThread.push(callback);
  }

  public setCharacter(character: CharacterProperties){
    this.character = character;
  }

  public addTarget(target: Target){
    console.log('[gameEngine][addTarget] this',this)
    this._targets.push(target);
  }
}