type CallbackGameEngine = () => void
export class Engine {
  private readonly runnigThread: CallbackGameEngine[];

  constructor(refreshTimer = 20){
    this.runnigThread = [];
    setInterval(() => {
      for (const callback of this.runnigThread) {
        callback();
      }
    }, refreshTimer)
  }

  public addGamingThread(callback: CallbackGameEngine): void {
    this.runnigThread.push(callback);
  }
}