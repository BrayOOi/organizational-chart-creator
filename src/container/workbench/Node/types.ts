export type NodeT = {
  id: string;
  title: string;
  color: string;
  width: number;
  height: number;
  coords: any;
  children: Array<NodeT>;
}
