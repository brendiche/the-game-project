import { CharacterProperties, getOffset, Target } from "./helper";

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
        for (let i = 0; i < this.targets.length; i++) {
          const target = this.targets[i];
          if(this.character.items.length){
            for(const item of this.character.items){
              if (item.position >= target.position && item.position <= target.position + getOffset(target.element)) {
                item.element.remove(); // TODO 2022-02-04: remove also the item in the 
                target.element.remove();
                this.targets.splice(i,1); // need to be very carful with this because it removes element in the array it's looping on
              }
            }
          } 
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