import { Observable } from "../helpers/observables";
import { entry } from "./menu.type";

export class MenuService {
  private readonly MenuUpdateSelectedItemEventType = 'Menu.UpdateSelectedItem';
  private readonly BackToMainMenuEventType = 'Menu.BackToMain';

  updateSelectedItem = new Observable<entry>(this.MenuUpdateSelectedItemEventType);
  backToMainMenu = new Observable(this.BackToMainMenuEventType);

  // backToMainMenu(): void{
  //   window.dispatchEvent(new CustomEvent(this.BackToMainMenuEventType));
  // }

  // onBackToMainMenu(callback: (e: CustomEvent) => void) {
  //   window.addEventListener(this.BackToMainMenuEventType, callback);
  // }

}

export const menuService = new MenuService();