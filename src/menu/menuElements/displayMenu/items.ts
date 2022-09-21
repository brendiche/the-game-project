import { MenuDetail } from "../../menu.type";
import { game } from '../../../game/game.service';
export class MenuItems implements MenuDetail {

  // TODO 2022-09-18 BGO make the menu linked to the character
  getDetail() {
    const inventory = game.player.inventrory;
    const container = document.createElement('div');
    container.style.display = 'grid';
    // container.style.backgroundColor ="red"
    container.style.fontFamily = 'ggSalasFont';
    container.style.color = 'white';
    container.style.fontSize = '20px';
    container.style.paddingLeft = '50px';

    for (let i = 0; i < 7; i++) {
      const itemDiv = document.createElement('div');
      itemDiv.style.gridColumn = '1';
      itemDiv.style.gridRow = `${i+1}`;
      itemDiv.appendChild(document.createTextNode(inventory[i]?.name ?? ''));
      container.appendChild(itemDiv);
    }
    return container;
  }

}