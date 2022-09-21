import { MenuDetail } from "../../menu.type";

export class MenuSpells implements MenuDetail {
  actionHandler: () => void;
  getDetail() {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="blue"
    return container;
  } 
}