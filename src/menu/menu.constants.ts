import { entrie } from "./menu.type";

export const menuEntries: entrie[] = [{
  title:'Objets',
  element: document.createElement('div'),
  action: () => (console.log('enter on object'))
},{
  title:'Sorts',
  element: document.createElement('div'),
  action: () => (console.log('enter on sorts'))
},{
  title:'Quêtes',
  element: document.createElement('div'),
  action: () => (console.log('enter on quest'))
},{
  title:'Equipement',
  element: document.createElement('div'),
  action: () => (console.log('enter on items'))
},{
  title:'Stats',
  element: document.createElement('div'),
  action: () => (console.log('enter on stats'))
},{
  title:'Enregistrer',
  element: document.createElement('div'),
  action: () => (console.log('enter on save'))
},{
  title:'Quitter',
  element: document.createElement('div'),
  action: () => (console.log('enter on quit'))
}]