export class MenuSpells{
  element: HTMLElement

  constructor(){
    this.element = this.createElement();
  }

  // TODO 2022-09-18 BGO make the menu linked to the character
  private createElement(): HTMLElement {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.backgroundColor ="blue"
    return container;
  }
}