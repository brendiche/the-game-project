import { entiresType, entry } from "./menu.type";
import {MenuItems} from './menuElements/displayMenu/items';
import { MenuQuests } from "./menuElements/displayMenu/quests";
import { MenuSpells } from "./menuElements/displayMenu/spells";
import { MenuStats } from "./menuElements/displayMenu/stats";
import { MenuStuff } from "./menuElements/displayMenu/stuff";

export const menuEntries: Record<entiresType, entry> = {
  item: {
    title: 'Objets',
    detail: new MenuItems(),
    action: () => (console.log('select item'))
  },
  spell: {
    title:'Sorts',
    detail: new MenuSpells(),
    action: () => (console.log('enter on sorts'))
  },
  quest: {
    title:'Quêtes',
    detail: new MenuQuests(),
    action: () => (console.log('enter on quest'))
  },
  stuf:{
    title:'Equipement',
    detail: new MenuStuff(),
    action: () => (console.log('enter on items'))
  },
  stat: {
    title:'Stats',
    detail: new MenuStats(),
    action: () => (console.log('enter on stats'))
  },
  save: {
    title:'Enregistrer',
    detail: { getDetail: () => document.createElement('div'), actionHandler: () => (console.log('')),},
    action: () => (console.log('enter on save'))
  },
  quit: {
    title:'Quitter',
    detail: { getDetail: () => document.createElement('div'), actionHandler: () => (console.log(''))},
    action: () => (console.log('enter on save'))
  }
}