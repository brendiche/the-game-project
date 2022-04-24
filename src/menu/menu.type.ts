const entiresTypeValues = ['quest', 'item', 'stuf', 'spell', 'stat', 'none'] as const;
export type entiresType = typeof entiresTypeValues[number];

interface entrie{
  title: string;
  type: entiresType;
}

export interface entrieItem extends entrie{
  type: 'item',
  entrieItems: {
    value : string[];
    grid: {
      columns: number;
      rows: number;
    }
  }
}

export interface entrieSpell extends entrie{
  type: 'spell',
  entrieItems: {
    value : string[];
    grid: {
      columns: number;
      rows: number;
    }
  }
}

export interface entrieQuest extends entrie{
  type: 'quest',
  entrieItems: {
    value : quest[];
    grid: {
      columns: number;
      rows: number;
    }
  }
}

export interface entrieStuf extends entrie{
  type: 'stuf',
  entrieItems: {
    value : stuf[];
    grid: {
      columns: number;
      rows: number;
    }
  }
}

export interface entrieStat extends entrie {
  type: 'stat',
  entrieItems: {
    value : stuf[];
    grid: {
      columns: number;
      rows: number;
    }
  }
}

export type menuEntrie = entrieItem | entrieSpell | entrieQuest | entrieStuf | entrie;


type quest = {
  label: string;
  description: string;
};

type  stuf = {
  label: string,
  items: {
    name: string,
    stats: {
      [stat in itemStatsType]: number
    }
  }[]
};

export const itemStatsValue = ['Flow', 'Technique', 'Charisma'] as const;
export type itemStatsType = typeof itemStatsValue[number];