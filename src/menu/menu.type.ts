const entiresTypeValues = ['quest', 'item', 'stuf', 'spell', 'stat', 'none'] as const;
export type entiresType = typeof entiresTypeValues[number];

const entiresTitleValues = ['Objets', 'Sorts', 'Quêtes', 'Equipement', 'Accessoires', 'Stats', 'Enregistrer', 'Quitter'] as const;
export type entiresTitleType = typeof entiresTitleValues[number];


export type entrie = {
  title: entiresTitleType;
  element: HTMLElement;
  action: () => void;
}

// export interface entrieItem extends entrie{
//   type: 'item',
//   entrieItems: {
//     value : string[];
//     grid: {
//       columns: number;
//       rows: number;
//     }
//   }
// }

// export interface entrieSpell extends entrie{
//   type: 'spell',
//   entrieItems: {
//     value : string[];
//     grid: {
//       columns: number;
//       rows: number;
//     }
//   }
// }

// export interface entrieQuest extends entrie{
//   type: 'quest',
//   entrieItems: {
//     value : quest[];
//     grid: {
//       columns: number;
//       rows: number;
//     }
//   }
// }

// export interface entrieStuf extends entrie{
//   type: 'stuf',
//   entrieItems: {
//     value : stuf[];
//     grid: {
//       columns: number;
//       rows: number;
//     }
//   }
// }

// export interface entrieStat extends entrie {
//   type: 'stat',
//   entrieItems: {
//     value : (string | Stat)[];
//     grid: {
//       columns: number;
//       rows: number;
//     }
//   }
// }

// export type menuEntrie = entrieItem | entrieSpell | entrieQuest | entrieStuf | entrieStat | entrie;


// type quest = {
//   label: string;
//   description: string;
// };

// type  stuf = {
//   label: string,
//   items: {
//     name: string,
//     stats: {
//       [stat in itemStatsType]: number
//     }
//   }[]
// };

// export type Stat = {
//   label : itemStatsType,
//   value: number
// }

export const itemStatsValue = ['Flow', 'Technique', 'Charisma'] as const;
export type itemStatsType = typeof itemStatsValue[number];