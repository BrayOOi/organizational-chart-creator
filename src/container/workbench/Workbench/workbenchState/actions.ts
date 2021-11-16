const addNode = (id: string) => ({
  type: 'click/add_child' as const,
  payload: id
});

export type ChartActionType = ReturnType<
  typeof addNode
>;

export default {
  addNode,
}