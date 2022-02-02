type CallbackGameEngine = () => void

const runnigThread: CallbackGameEngine[] = [];

// TODO 2022-02-02 create a class Engine that could be pass to all the game elements

export const initEngine = ()=> {
  setInterval(() => {
    for (const callback of runnigThread) {
      callback();
    }
  },20);
}

export const addGamingThread = (callback: CallbackGameEngine): void => {
  runnigThread.push(callback);
}