const addNode = () => ({
  type: 'click/add_node' as const,
});

export type ChartActionType = ReturnType<
  typeof addNode
>;

export default {
  addNode,
}