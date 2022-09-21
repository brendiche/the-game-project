import { MenuDetail } from "../../menu.type";

export class MenuStuff implements MenuDetail{
  actionHandler: () => void;
  getDetail(){
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="yellow"
    return container;
  }
  
}