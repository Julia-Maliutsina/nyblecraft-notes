export interface INote {
  id: number | null;
  title: string;
  text: string;
  date: string;
  tags: Array<string>;
}
