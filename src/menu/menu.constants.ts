import { entiresType, entry } from "./menu.type";
import {MenuItems} from './menuElements/displayMenu/items';
import { MenuQuests } from "./menuElements/displayMenu/quests";
import { MenuSpells } from "./menuElements/displayMenu/spells";
import { MenuStats } from "./menuElements/displayMenu/stats";
import { MenuStuff } from "./menuElements/displayMenu/stuff";

export const menuEntries: Record<entiresType, entry> = {
  item: {
    title: 'Objets',
    element: new MenuItems().element,
    action: () => (console.log('select item'))
  },
  spell: {
    title:'Sorts',
    element: new MenuSpells().element,
    action: () => (console.log('enter on sorts'))
  },
  quest: {
    title:'Quêtes',
    element: new MenuQuests().element,
    action: () => (console.log('enter on quest'))
  },
  stuf:{
    title:'Equipement',
    element: new MenuStuff().element,
    action: () => (console.log('enter on items'))
  },
  stat: {
    title:'Stats',
    element: new MenuStats().element,
    action: () => (console.log('enter on stats'))
  },
  save: {
    title:'Enregistrer',
    element: document.createElement('div'),
    action: () => (console.log('enter on save'))
  },
  quit: {
    title:'Quitter',
    element: document.createElement('div'),
    action: () => (console.log('enter on save'))
  }
}