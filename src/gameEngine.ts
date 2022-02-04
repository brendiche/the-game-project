import { CharacterProperties, Target } from "./helper";

type CallbackGameEngine = () => void
export class Engine {
  private readonly runnigThread: CallbackGameEngine[];
  private character: CharacterProperties;
  private targets: Target[] = [];

  constructor(refreshTimer = 20){
    this.runnigThread = [];
    setInterval(() => {
      for (const callback of this.runnigThread) {
        callback();
      }
      if(this.character && this.targets.length){
        for (const target of this.targets) {
          if(this.character.position === target.position) alert('colision detected')
        }
      }
    }, refreshTimer)
  }

  public addGamingThread(callback: CallbackGameEngine): void {
    this.runnigThread.push(callback);
  }

  public setCharacter(character: CharacterProperties){
    this.character = character;
  }

  public addTarget(target: Target){
    console.log('[gameEngine][addTarget] this',this)
    this.targets.push(target);
  }
}