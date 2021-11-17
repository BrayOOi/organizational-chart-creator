export type NodeT = {
  id: string;
  title: string;
  backgroundColor: string;
  fontColor: string;
  width: number;
  height: number;
  fontSize: number;
  coords: any;
  children: Array<NodeT>;
}
