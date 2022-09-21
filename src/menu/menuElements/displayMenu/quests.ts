import { MenuDetail } from "../../menu.type";

export class MenuQuests implements MenuDetail{
  
  getDetail(){
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="orange"
    return container;
  }
}