import { MenuDetail } from "../../menu.type";

export class MenuStats implements MenuDetail{
  getDetail(){
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="grey"
    return container;
  }
  
}