export class AdditionalInfos {
  element: HTMLElement;

  constructor(){
    this.element = this.createElement();
  }

  private createElement() {
      const frameGil = document.createElement('div');
      frameGil.style.backgroundColor = 'rgba(255,255,255,0.2)';
      frameGil.style.border = '3px solid white';
      frameGil.style.borderRadius = '5px'
      frameGil.style.height = '95%';
      frameGil.style.textAlign = 'center';
      frameGil.style.color = 'white';
      frameGil.style.fontFamily = 'ggSalasFont';
      frameGil.style.fontSize = '17px';
      frameGil.style.lineHeight = '45px';
      frameGil.appendChild(document.createTextNode('18050 Gil'));
      
      const frameGal = document.createElement('div');
      frameGal.style.backgroundColor = 'rgba(255,255,255,0.2)';
      frameGal.style.border = '3px solid white';
      frameGal.style.borderRadius = '5px'
      frameGal.style.height = '95%';
      frameGal.style.textAlign = 'center';
      frameGal.style.color = 'white';
      frameGal.style.fontFamily = 'ggSalasFont';
      frameGal.style.fontSize = '17px';
      frameGal.style.lineHeight = '45px';
      frameGal.appendChild(document.createTextNode('Galbadia'));
    
      const buttons = document.createElement('div');
      buttons.style.gridColumn = '4/6';
      buttons.style.gridRow = '4';
      buttons.style.display = 'grid';
      buttons.style.gridTemplateColumns = '1fr'
      buttons.style.gridTemplateRows = 'repeat(2,1fr)'
      const buttonTop = document.createElement('div');
      buttonTop.style.gridColumn = '1';
      buttonTop.style.gridRow = '1';
      buttonTop.style.padding = '10px 45px';
      const buttonBottom = document.createElement('div');
      buttonBottom.style.gridColumn = '1';
      buttonBottom.style.gridRow = '2';
      buttonBottom.style.padding = '10px 45px';
    
      buttonTop.appendChild(frameGil);
      buttonBottom.appendChild(frameGal);
      buttons.appendChild(buttonTop);
      buttons.appendChild(buttonBottom);
      
      return buttons
  }
}