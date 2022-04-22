import { entrieItem, entrieQuest, entrieSpell, entrieStuf, menuEntrie, itemStatsValue } from "./menu.type";

export const menuEntries: menuEntrie[] = [{
  title: 'Objets',
  type: 'item',
  entrieItems: {
    value: ['Générateur de ref', 'Pixeliser', 'Potion'],
    grid: {
      rows: 7,
      columns: 1,
    }
  }
},{
  title: 'Sorts',
  type:'spell',
  entrieItems: {
    value:['Brasier', 'Teleports'],
    grid: {
      rows: 7,
      columns: 1,
    }
  },
},{
  title: 'Quêtes',
  type: 'quest',
  entrieItems: {
    value:[{
    label: 'Premier freestyle Instagram',
    description: 'Participe au concours de NewTone x DMT x Damn pour t’exercer en mixing et mettre un pied dans le montage vidéo',
  },{
    label: 'Bad mood',
    description: 'Place un flow aérien sur une prod électronique',
  },{
    label: 'Hardbass preset',
    description: 'Place un flow troll sur une prod hardbass hardstyle',
  },{
    label: 'Rap contest',
    description: 'Participe au concours de DMT x Fat x Damn sur prod imposée afin de te faire connaître par le réseau',
  }],
  grid: {
    rows: 4,
    columns: 1,
  }
}
},{
  title: 'Equipement',
  type: 'stuf',
  entrieItems: {
    grid:{
      columns: 2,
      rows: 3,
    },
    value: [{
      label:'Armes',
      items:[{
        name:'test',
        stats:{
          Charisma: 0,
          Flow: 0,
          Technique: 0,
        }
      }]
    },{
      label:'Armures',
      items:[{
        name:'test',
        stats:{
          Charisma: 0,
          Flow: 0,
          Technique: 0,
        }
      }]
    },{
      label:'Accessoires',
      items:[{
        name:'test',
        stats:{
          Charisma: 0,
          Flow: 0,
          Technique: 0,
        }
      }]
    }],
  }
},{
  title: 'Stats',
  type: 'none',
},{
  title: 'Enregistrer',
  type: 'none',
},{
  title: 'Quitter',
  type: 'none',
}];


export const getAvatar = ():HTMLElement => {
  const avatar = document.createElement('div');
  avatar.style.gridColumn = '1/4';
  avatar.style.gridRow = '1';
  avatar.style.padding = '20px';
  const avatarFrame = document.createElement('div');
  avatarFrame.style.backgroundColor = 'rgba(255,255,255,0.2)';
  avatarFrame.style.border = '2px solid white';
  avatarFrame.style.borderRadius = '5px'
  avatarFrame.style.height = '100%';
  avatarFrame.style.display = 'grid';
  avatarFrame.style.gridTemplateColumns = 'repeat(3, 1fr)';
  avatarFrame.style.gridTemplateRows = 'repeat(3, 1fr)';

  const avatarImgFrame = document.createElement('div');
  avatarImgFrame.style.gridColumn = '1';
  avatarImgFrame.style.gridRow = '1/4';
  avatarImgFrame.style.backgroundColor = '#dbdbdb';
  avatarImgFrame.style.margin = '15px 20px';
  avatarImgFrame.style.border = '5px solid black';
  avatarImgFrame.style.borderRadius = '5px';
  const avatarImg = document.createElement('div');
  avatarImg.className = 'avatar';
  avatarImg.style.backgroundPositionX = 'center'
  avatarImg.style.height = '100%';
  avatarImgFrame.appendChild(avatarImg);

  const pseudoBalise = document.createElement('div');
  const pseudo = document.createTextNode("ggSalas");
  pseudoBalise.appendChild(pseudo);
  pseudoBalise.style.gridColumn = '2/4';
  pseudoBalise.style.gridRow = '1';
  pseudoBalise.style.fontFamily = 'ggSalasTitle';
  pseudoBalise.style.fontSize = '32px'
  pseudoBalise.style.color = '#f1cd0b';

  const levelBalise = document.createElement('div');
  const level = document.createTextNode("Niveau 11");
  levelBalise.appendChild(level);
  levelBalise.style.gridColumn = '2/4';
  levelBalise.style.gridRow = '2';
  levelBalise.style.fontFamily = 'ggSalasFont';
  levelBalise.style.color = '#ffffff';

  const progerssBar = document.createElement('div');
  progerssBar.style.gridColumn = '2/4';
  progerssBar.style.gridRow = '3';
  progerssBar.style.height = '20px';
  progerssBar.style.backgroundColor = 'white';
  progerssBar.style.marginRight = '20%';
  progerssBar.style.padding = '4px'

  const bar = document.createElement('div');
  bar.style.backgroundColor = '#4c4b4b';
  bar.style.height = '20px';
  bar.style.width = '60%';
  progerssBar.appendChild(bar)

  avatarFrame.appendChild(avatarImgFrame);
  avatarFrame.appendChild(pseudoBalise);
  avatarFrame.appendChild(progerssBar);
  avatarFrame.appendChild(levelBalise);

  avatar.appendChild(avatarFrame);
  return avatar;
}

export const getSubMenu = (entries: string[]): HTMLElement => {
const subMenu = document.createElement('div');
subMenu.style.gridColumn = '4/6';
subMenu.style.gridRow = '1/4';
subMenu.style.padding = '20px';

const frame = document.createElement('div');
frame.style.backgroundColor = 'rgba(255,255,255,0.2)';
frame.style.border = '3px solid white';
frame.style.borderRadius = '5px'
frame.style.height = '100%';
frame.style.display = 'grid';
frame.style.gridTemplateColumns = '1fr';
frame.style.gridTemplateRows = 'repeat(9, 1fr)';

entries.forEach((entrie, i) => {
  const items = document.createElement('div');
  items.id = `subMenu-${entrie}`;
  items.style.gridRow = `${i+2}`;
  items.style.gridColumn = '1';
  items.style.fontFamily = 'ggSalasFont';
  items.style.color = 'white';
  items.style.paddingLeft = '70px';
  items.style.fontSize = '20px';
  items.style.marginTop = '15px';
  items.appendChild(document.createTextNode(entrie))  
  frame.appendChild(items);
})

const cursor = document.createElement('div');
cursor.id = 'subMenuCursor'
cursor.className = 'subMenuPointer';
cursor.style.gridRow = '2';
cursor.style.gridColumn = '1';
frame.appendChild(cursor);

subMenu.appendChild(frame);

return subMenu;
}

export const getInfos = (menuEntrie: menuEntrie) => {
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
  titleFrame.appendChild(document.createTextNode(menuEntrie.title))
  frame.appendChild(titleFrame);


  const itemsFrame = document.createElement('div');
  itemsFrame.style.display = 'grid';
  switch(menuEntrie.type){
    case 'item':
    case 'spell':
      itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieItem | entrieSpell).entrieItems.grid.columns}, 1fr)`;
      itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieItem | entrieSpell).entrieItems.grid.rows}, 1fr)`;
      itemsFrame.id = 'cursor-target';
      (menuEntrie as entrieItem | entrieSpell).entrieItems.value.forEach((item, i) => {
        const itemFrame = document.createElement('div');
        itemFrame.style.fontFamily = 'ggSalasFont';
        itemFrame.style.color = 'white';
        itemFrame.style.fontSize = '20px';
        itemFrame.style.paddingLeft = '50px';
        itemFrame.style.gridColumn = '1';
        itemFrame.style.gridRow = `${i+1}`;
        itemFrame.style.fontFamily = 'ggSalasFont';
        itemFrame.style.color = 'white';
        itemFrame.style.paddingTop = '15px';
        itemFrame.appendChild(document.createTextNode(item));
        itemsFrame.appendChild(itemFrame);
      })
      break;
    case 'quest':
      itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieQuest).entrieItems.grid.columns}, 1fr)`;
      itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieQuest).entrieItems.grid.rows}, 1fr)`;
      (menuEntrie as entrieQuest).entrieItems.value.forEach((item, i) => {
        const itemFrame = document.createElement('div');
        itemFrame.style.fontFamily = 'ggSalasFont';
        itemFrame.style.color = 'white';
        itemFrame.style.fontSize = '20px';
        itemFrame.style.paddingLeft = '50px';
        itemFrame.style.gridColumn = '1';
        itemFrame.style.gridRow = `${i+1}`;
        itemFrame.style.position = 'relative';
        const dot = document.createElement('div');
        dot.style.backgroundColor = 'white';
        dot.style.height = '15px';
        dot.style.width = '15px';
        dot.style.borderRadius = '20px';
        dot.style.position = 'absolute';
        dot.style.top = '7px';
        dot.style.left = '20px';
        itemFrame.appendChild(dot);
        itemFrame.appendChild(document.createTextNode(item.label));
        itemFrame.appendChild(document.createElement('br'));
        const span = document.createElement('span');
        span.style.fontSize = '10px';
        span.appendChild(document.createTextNode(item.description))
        itemFrame.appendChild(span);
        itemsFrame.appendChild(itemFrame);
      });
      break;
    case 'stuf':
      itemsFrame.style.gridTemplateColumns = `repeat(${(menuEntrie as entrieStuf).entrieItems.grid.columns}, 1fr)`;
      itemsFrame.style.gridTemplateRows = `repeat(${(menuEntrie as entrieStuf).entrieItems.grid.rows}, 1fr)`;
      (menuEntrie as entrieStuf).entrieItems.value.forEach((item, i) => {
        const itemFrame = document.createElement('div');
        itemFrame.style.fontFamily = 'ggSalasFont';
        itemFrame.style.color = 'white';
        itemFrame.style.fontSize = '20px';
        itemFrame.style.paddingLeft = '50px';
        itemFrame.style.gridColumn = '1';
        itemFrame.style.gridRow = `${i+1}`;
        itemFrame.style.position = 'relative';
        itemFrame.style.borderRight = '2px solid white'
        const dot = document.createElement('div');
        dot.style.backgroundColor = 'white';
        dot.style.height = '15px';
        dot.style.width = '15px';
        dot.style.borderRadius = '20px';
        dot.style.position = 'absolute';
        dot.style.top = '7px';
        dot.style.left = '20px';
        itemFrame.appendChild(dot);
        itemFrame.appendChild(document.createTextNode(item.label));
        itemsFrame.appendChild(itemFrame);
      });
      // eslint-disable-next-line no-case-declarations
      const stats = document.createElement('div');
      stats.style.gridColumn = '2';
      stats.style.gridRow = '3';
      stats.style.borderTop = '2px solid white';
      stats.style.fontFamily = 'ggSalasFont';
      stats.style.color = 'white';
      stats.style.fontSize = '20px';
      stats.style.padding = '10px 0 0 15px';
      itemStatsValue.forEach(stat => {
        stats.appendChild(document.createTextNode(`${stat} :`));
        stats.appendChild(document.createElement('br'));
      })
      itemsFrame.appendChild(stats);
      break;
  }

  frame.appendChild(itemsFrame);  
  infos.appendChild(frame);
  
  return infos
}

export const getStaticInfos = () => {
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

// export const createCursor = () => {

// }