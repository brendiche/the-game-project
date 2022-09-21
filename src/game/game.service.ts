import { Player } from "./player"

class Game {
  player: Player;
  
  constructor(){
    this.player = new Player();
  }
}

export const game = new Game()