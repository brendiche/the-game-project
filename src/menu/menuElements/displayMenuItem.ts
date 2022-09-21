import { MenuService } from "../menu.service";
import { entry } from "../menu.type";

export class DisplayMenuItem {
  element: HTMLElement;
  private entry: entry;
  private titleName: Text;
  private content: HTMLElement;
  private menuService: MenuService

  constructor(entry: entry, menuService: MenuService){
    this.entry = entry;
    this.element = this.createTemplate();
    this.menuService = menuService;
    this.menuService.onUpdateSelectedItem((event) => this.selectedEntry(event.detail))
  }

  private selectedEntry(entry: entry) {
    this.entry = entry;
    this.titleName.nodeValue = this.entry.title;
    this.content.firstChild.replaceWith(this.entry.detail.getDetail());
  }

  private createTemplate(): HTMLElement{
    this.titleName = document.createTextNode(this.entry.title)
    const infos = document.createElement('div');
    infos.id = 'menu-info';
    infos.style.gridColumn = '1/4';
    infos.style.gridRow = '2/5';
    infos.style.padding = '20px';
  
    const frame = document.createElement('div');
    frame.style.backgroundColor = 'rgba(255,255,255,0.2)';
    frame.style.border = '3px solid white';
    frame.style.borderRadius = '5px'
    frame.style.height = '100%';
    frame.style.display = 'grid';
    frame.style.gridTemplateColumns = '1fr';
    frame.style.gridTemplateRows = '1fr 7fr';
    
    const titleFrame = document.createElement('div');
    titleFrame.style.gridColumn = '1';
    titleFrame.style.gridRow = '1';
    titleFrame.style.backgroundColor = '#4c4b4b';
    titleFrame.style.borderBottom = '3px solid white';
    titleFrame.style.borderRadius = '5px 5px 0 0';
    titleFrame.style.textAlign = 'center';
    titleFrame.style.color = 'white';
    titleFrame.style.fontFamily = 'ggSalasFont';
    titleFrame.style.fontSize = '20px';
    titleFrame.style.paddingTop = '10px';
    titleFrame.appendChild(this.titleName) /// <= menuEntrie.title
    frame.appendChild(titleFrame);

    this.content = document.createElement('div');
    this.content.style.display = 'grid';
    this.content.appendChild(this.entry.detail.getDetail());

    frame.appendChild(this.content);  
    infos.appendChild(frame);

    return infos;
  }
}

// TODO 2022-09-17 BGO clean up this messy display

// export const getInfos = (menuEntrie: menuEntrie) => {
//   const infos = document.createElement('div');
//   infos.id = 'menu-info';
//   infos.style.gridColumn = '1/4';
//   infos.style.gridRow = '2/5';
//   infos.style.padding = '20px';

//   const frame = document.createElement('div');
//   frame.style.backgroundColor = 'rgba(255,255,255,0.2)';
//   frame.style.border = '3px solid white';
//   frame.style.borderRadius = '5px'
//   frame.style.height = '100%';
//   frame.style.display = 'grid';
//   frame.style.gridTemplateColumns = '1fr';
//   frame.style.gridTemplateRows = '1fr 7fr';
  
//   const titleFrame = document.createElement('div');
//   titleFrame.style.gridColumn = '1';
//   titleFrame.style.gridRow = '1';
//   titleFrame.style.backgroundColor = '#4c4b4b';
//   titleFrame.style.borderBottom = '3px solid white';
//   titleFrame.style.borderRadius = '5px 5px 0 0';
//   titleFrame.style.textAlign = 'center';
//   titleFrame.style.color = 'white';
//   titleFrame.style.fontFamily = 'ggSalasFont';
//   titleFrame.style.fontSize = '20px';
//   titleFrame.style.paddingTop = '10px';
//   titleFrame.appendChild(document.createTextNode(menuEntrie.title))
//   frame.appendChild(titleFrame);


//   const itemsFrame = document.createElement('div');
//   itemsFrame.style.display = 'grid';
//   switch(menuEntrie.type){
//     case 'item':
//     case 'spell':
//       itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieItem | entrieSpell).entrieItems.grid.columns}, 1fr)`;
//       itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieItem | entrieSpell).entrieItems.grid.rows}, 1fr)`;
//       itemsFrame.id = 'cursor-target';
//       (menuEntrie as entrieItem | entrieSpell).entrieItems.value.forEach((item, i) => {
//         const itemFrame = document.createElement('div');
//         itemFrame.style.fontFamily = 'ggSalasFont';
//         itemFrame.style.color = 'white';
//         itemFrame.style.fontSize = '20px';
//         itemFrame.style.paddingLeft = '50px';
//         itemFrame.style.gridColumn = '1';
//         itemFrame.style.gridRow = `${i+1}`;
//         itemFrame.style.fontFamily = 'ggSalasFont';
//         itemFrame.style.color = 'white';
//         itemFrame.style.paddingTop = '15px';
//         itemFrame.appendChild(document.createTextNode(item));
//         itemsFrame.appendChild(itemFrame);
//       })
//       break;
//     case 'quest':
//       itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieQuest).entrieItems.grid.columns}, 1fr)`;
//       itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieQuest).entrieItems.grid.rows}, 1fr)`;
//       (menuEntrie as entrieQuest).entrieItems.value.forEach((item, i) => {
//         const itemFrame = document.createElement('div');
//         itemFrame.style.fontFamily = 'ggSalasFont';
//         itemFrame.style.color = 'white';
//         itemFrame.style.fontSize = '20px';
//         itemFrame.style.paddingLeft = '50px';
//         itemFrame.style.gridColumn = '1';
//         itemFrame.style.gridRow = `${i+1}`;
//         itemFrame.style.position = 'relative';
//         const dot = document.createElement('div');
//         dot.style.backgroundColor = 'white';
//         dot.style.height = '15px';
//         dot.style.width = '15px';
//         dot.style.borderRadius = '20px';
//         dot.style.position = 'absolute';
//         dot.style.top = '7px';
//         dot.style.left = '20px';
//         itemFrame.appendChild(dot);
//         itemFrame.appendChild(document.createTextNode(item.label));
//         itemFrame.appendChild(document.createElement('br'));
//         const span = document.createElement('span');
//         span.style.fontSize = '10px';
//         span.appendChild(document.createTextNode(item.description))
//         itemFrame.appendChild(span);
//         itemsFrame.appendChild(itemFrame);
//       });
//       break;
//     case 'stuf':
//       itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieStuf).entrieItems.grid.columns}, 1fr)`;
//       itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieStuf).entrieItems.grid.rows}, 1fr)`;
//       itemsFrame.id = 'cursor-target';
//       (menuEntrie as entrieStuf).entrieItems.value.forEach((item, i) => {
//         const itemFrame = document.createElement('div');
//         itemFrame.style.fontFamily = 'ggSalasFont';
//         itemFrame.style.color = 'white';
//         itemFrame.style.fontSize = '20px';
//         itemFrame.style.paddingLeft = '50px';
//         itemFrame.style.gridColumn = '1';
//         itemFrame.style.gridRow = `${i+1}`;
//         itemFrame.style.position = 'relative';
//         itemFrame.style.borderRight = '2px solid white';
//         itemFrame.style.paddingTop = '15px';
//         const dot = document.createElement('div');
//         dot.style.backgroundColor = 'white';
//         dot.style.height = '15px';
//         dot.style.width = '15px';
//         dot.style.borderRadius = '20px';
//         dot.style.position = 'absolute';
//         dot.style.top = '22px';
//         dot.style.left = '20px';
//         itemFrame.appendChild(dot);
//         itemFrame.appendChild(document.createTextNode(item.label));
//         itemsFrame.appendChild(itemFrame);

//         if(item.label === 'Armes'){
//           const assetsFrame = document.createElement('div');
//           assetsFrame.style.gridColumn = '2';
//           assetsFrame.style.gridRow = '1/3';
//           assetsFrame.style.fontFamily = 'ggSalasFont';
//           assetsFrame.style.color = 'white';
//           assetsFrame.style.fontSize = '20px';
//           assetsFrame.style.color = 'white';
//           assetsFrame.style.paddingLeft = '10px';
//           assetsFrame.style.display = 'grid';
//           assetsFrame.style.gridTemplateColumns = '1';
//           assetsFrame.style.gridTemplateRows = '4';
//           item.items.forEach((subItem,j) => {
//             const assets = document.createElement('div');
//             assets.style.gridColumn = '1';
//             assets.style.gridRow = `${j}`;
//             assets.appendChild(document.createTextNode(subItem.name));
//             assetsFrame.appendChild(assets);
//           });
//           itemsFrame.appendChild(assetsFrame);
//         }
//       });
//       // eslint-disable-next-line no-case-declarations
//       const stats = document.createElement('div');
//       stats.style.gridColumn = '2';
//       stats.style.gridRow = '3';
//       stats.style.borderTop = '2px solid white';
//       stats.style.fontFamily = 'ggSalasFont';
//       stats.style.color = 'white';
//       stats.style.fontSize = '20px';
//       stats.style.padding = '10px 0 0 15px';
//       itemStatsValue.forEach(stat => {
//         stats.appendChild(document.createTextNode(`${stat} :`));
//         stats.appendChild(document.createElement('br'));
//       })
//       itemsFrame.appendChild(stats);
//       break;
//     case 'stat':
//       itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieStat).entrieItems.grid.columns}, 1fr)`;
//       itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieStat).entrieItems.grid.rows}, 1fr)`;
//       // eslint-disable-next-line no-case-declarations
//       const spell = document.createElement('div');
//       spell.style.gridColumn = '1';
//       spell.style.gridRow = '4';
//       spell.style.borderTop = '3px solid white';
//       spell.style.fontFamily = 'ggSalasFont';
//       spell.style.color = 'white';
//       spell.style.fontSize = '20px';
//       spell.style.textAlign = 'center';
//       spell.appendChild(document.createTextNode('Sorts'));

//       getSpell(menuEntries).forEach((spell, i) => {
//         const spellItem = document.createElement('div');
//         spellItem.style.fontFamily = 'ggSalasFont';
//         spellItem.style.color = 'white';
//         spellItem.style.fontSize = '15px';
//         spellItem.style.paddingLeft = '10px';
//         spellItem.style.gridColumn = '1';
//         spellItem.style.gridRow = `${i+5}`;
//         spellItem.appendChild(document.createTextNode(spell));
//         itemsFrame.appendChild(spellItem);
//       })
//       // eslint-disable-next-line no-case-declarations
//       const stat = document.createElement('div');
//       stat.style.gridColumn = '2';
//       stat.style.gridRow = '4';
//       stat.style.borderTop = '3px solid white';
//       stat.style.borderLeft = '3px solid white';
//       stat.style.fontFamily = 'ggSalasFont';
//       stat.style.color = 'white';
//       stat.style.fontSize = '20px';
//       stat.style.textAlign = 'center';
//       stat.appendChild(document.createTextNode('Stats'));

//       (menuEntrie as entrieStat).entrieItems.value.forEach((stat,i) => {
//         if(typeof stat !== 'string'){
//           const statDetail = document.createElement('div');
//           statDetail.style.gridColumn = '2';
//           statDetail.style.gridRow = `${i+2}`;
//           statDetail.style.borderLeft = '3px solid white';
//           statDetail.style.paddingLeft = '10px';
//           statDetail.style.fontFamily = 'ggSalasFont';
//           statDetail.style.color = 'white';
//           statDetail.style.fontSize = '15px';
//           statDetail.appendChild(document.createTextNode(`${stat.label}: ${stat.value}`));
//           itemsFrame.appendChild(statDetail);
//         } else {
//           const statDetail = document.createElement('div');
//           statDetail.style.gridColumn = '1/3';
//           statDetail.style.gridRow = `${i+1}`;
//           statDetail.style.fontFamily = 'ggSalasFont';
//           statDetail.style.color = 'white';
//           statDetail.style.fontSize = '15px';
//           statDetail.style.paddingLeft = '10px';
//           statDetail.appendChild(document.createTextNode(`${stat}`));
//           itemsFrame.appendChild(statDetail);
//         }
//       });
//       itemsFrame.appendChild(spell);
//       itemsFrame.appendChild(stat);

//       break;
//   }

//   frame.appendChild(itemsFrame);  
//   infos.appendChild(frame);
  
//   return infos
// }

// const getSpell = (menuEntries: menuEntrie[]): string[] => {
//   const spells = menuEntries.find(entrie => entrie.type === 'spell')
//   if(spells){
//     return (spells as entrieSpell).entrieItems.value
//   }

//   return [];
// }