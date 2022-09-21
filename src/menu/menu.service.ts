import { entry } from "./menu.type";

export class MenuService {
  private readonly MenuUpdateSelectedItemEventType = 'Menu.UpdateSelectedItem';

  updateSelectedItem(item: entry): void{
    const event = new CustomEvent<entry>(this.MenuUpdateSelectedItemEventType, {detail: item});
    window.dispatchEvent(event)
  }

  onUpdateSelectedItem(callback: (e: CustomEvent<entry>) => void) {
    window.addEventListener(this.MenuUpdateSelectedItemEventType, callback);
  }
}