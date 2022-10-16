import { Observable } from "../helpers/observables";
import { entry } from "./menu.type";

export class MenuService {
  private readonly MenuUpdateSelectedItemEventType = 'Menu.UpdateSelectedItem';
  private readonly BackToMainMenuEventType = 'Menu.BackToMain';
  private readonly ActionEntryMainMenuEventType = 'Menu.ActionEntry';

  updateSelectedItem = new Observable<entry>(this.MenuUpdateSelectedItemEventType);
  backToMainMenu = new Observable(this.BackToMainMenuEventType);
  mainMenuAction = new Observable<entry>(this.ActionEntryMainMenuEventType);
}

export const menuService = new MenuService();