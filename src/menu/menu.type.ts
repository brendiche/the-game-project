export type entrie = {
  title: string;
  items?: entrieItems;
}

type entrieItems = {
  value : string[] | quest[];
  grid: {
    columns: number;
    rows: number;
  }
}

type quest = {
  label: string;
  description: string;
}