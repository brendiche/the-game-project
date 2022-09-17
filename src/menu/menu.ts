import { menuEntries } from "./menu.constants";
import { entrie } from "./menu.type";
import { AdditionalInfos } from "./menuElements/additionalInfos";
import { CharacterInfos } from './menuElements/charaterInfos';
import { DisplayMenuItem } from "./menuElements/displayMenuItem";
import { MainMenu } from "./menuElements/mainMenu";

export class GameMenu{
  menuEntries: entrie[];
  element: HTMLElement;

  private characterInfos: CharacterInfos;
  private mainMenu: MainMenu;
  private additionalInfos: AdditionalInfos;
  private displayMenuItem: DisplayMenuItem;

  constructor(){
    this.characterInfos = new CharacterInfos();
    this.mainMenu = new MainMenu(menuEntries);
    this.additionalInfos = new AdditionalInfos();
    this.displayMenuItem = new DisplayMenuItem();
    this.element = this.createMenu();
  }
  get isOpen(): boolean{
    return getComputedStyle(this.element).display !== 'none';
  }

  public toggleMenu(): void {
    if(this.isOpen){
      this.element.style.display = 'none';
    }else{
      this.element.style.display = 'grid';
    }
  }

  private createMenu(): HTMLElement {
    const main = document.createElement('div');
    main.className = 'menu';
    main.style.display ='none';
    main.style.gridTemplateColumns ='repeat(5, 1fr)'
    main.style.gridTemplateRows ='repeat(4, 1fr)'
    // frame 
    const frame = document.createElement('div');
    frame.style.backgroundColor = 'rgba(255,255,255,0.2)';
    frame.style.border = '3px solid white';
    frame.style.borderRadius = '5px'
    frame.style.height = '100%';

    main.appendChild(this.characterInfos.element);
    main.appendChild(this.displayMenuItem.element);
    main.appendChild(this.mainMenu.element);
    main.appendChild(this.additionalInfos.element);

    return main
  }

}

// export const menuEntries: menuEntrie[] = [{
//   title: 'Objets',
//   type: 'item',
//   entrieItems: {
//     value: ['Générateur de ref', 'Pixeliser', 'Potion'],
//     grid: {
//       rows: 7,
//       columns: 1,
//     }
//   }
// },{
//   title: 'Sorts',
//   type:'spell',
//   entrieItems: {
//     value:['Brasier', 'Teleports'],
//     grid: {
//       rows: 7,
//       columns: 1,
//     }
//   },
// },{
//   title: 'Quêtes',
//   type: 'quest',
//   entrieItems: {
//     value:[{
//     label: 'Premier freestyle Instagram',
//     description: 'Participe au concours de NewTone x DMT x Damn pour t’exercer en mixing et mettre un pied dans le montage vidéo',
//   },{
//     label: 'Bad mood',
//     description: 'Place un flow aérien sur une prod électronique',
//   },{
//     label: 'Hardbass preset',
//     description: 'Place un flow troll sur une prod hardbass hardstyle',
//   },{
//     label: 'Rap contest',
//     description: 'Participe au concours de DMT x Fat x Damn sur prod imposée afin de te faire connaître par le réseau',
//   }],
//   grid: {
//     rows: 4,
//     columns: 1,
//   }
// }
// },{
//   title: 'Equipement',
//   type: 'stuf',
//   entrieItems: {
//     grid:{
//       columns: 2,
//       rows: 3,
//     },
//     value: [{
//       label:'Armes',
//       items:[{
//         name:'Micro',
//         stats:{
//           Charisma: 15,
//           Flow: 7,
//           Technique: 4,
//         }
//       }]
//     },{
//       label:'Armures',
//       items:[{
//         name:'Veste hipster',
//         stats:{
//           Charisma: 7,
//           Flow: 6,
//           Technique: 15,
//         }
//       }]
//     },{
//       label:'Accessoires',
//       items:[{
//         name:'X',
//         stats:{
//           Charisma: 0,
//           Flow: 0,
//           Technique: 0,
//         }
//       }]
//     }],
//   }
// },{
//   title: 'Stats',
//   type: 'stat',
//   entrieItems: {
//     grid:{
//       columns: 2,
//       rows: 7,
//     },
//     value: ['HP 210/210','MP 90/90','XP 100 pour monter un niveau', {
//       label:'Flow',
//       value: 21
//     },{
//       label: 'Technique',
//       value: 18
//     },{
//       label: 'Charisma',
//       value: 20,
//     }],
//   }
// },{
//   title: 'Enregistrer',
//   type: 'none',
// },{
//   title: 'Quitter',
//   type: 'none',
// }];

