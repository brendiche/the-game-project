import { MenuDetail } from "../../menu.type";

export class MenuStats implements MenuDetail{
  actionHandler: () => void;
  getDetail(){
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="grey"
    return container;
  }
  
}