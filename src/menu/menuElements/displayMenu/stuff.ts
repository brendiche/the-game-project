import { MenuDetail } from "../../menu.type";

export class MenuStuff implements MenuDetail{
  getDetail(){
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="yellow"
    return container;
  }
  
}