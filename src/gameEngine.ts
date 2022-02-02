type CallbackGameEngine = () => void

const runnigThread: CallbackGameEngine[] = [];

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