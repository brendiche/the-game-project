export class Fight  {
  element: HTMLElement;

  constructor(){
    this.element = this.createFightScreen();
    window.addEventListener('keydown', (event) => {
      if(event.key === 'f'){
        console.log('YEAH');
        // open the fight screen
        this.toggleFightScreen();
      }
    })
  }


  private createFightScreen(): HTMLElement {
    const main = document.createElement('div');
    main.className = 'fightScreen';
    main.style.display ='none';
    return main
  }

  private toggleFightScreen(): void {
    if(this.element.style.display === 'none') {
      this.element.style.display = 'grid';
    }else{
      this.element.style.display = 'none';
    }
  }
}