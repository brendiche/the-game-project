type CallbackGameEngine = () => void

const runnigThread: CallbackGameEngine[] = [];

let engine: NodeJS.Timer;

export const initEngine = ()=> {
  engine = setInterval(() => {
    for (const callback of runnigThread) {
      callback();
    }
  },20);
}

export const addGamingThread = (callback: CallbackGameEngine): void => {
  runnigThread.push(callback);
}