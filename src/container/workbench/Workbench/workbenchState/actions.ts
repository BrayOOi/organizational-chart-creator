// chart operations
const addNode = (id: string) => ({
  type: 'click/add_child' as const,
  payload: id
});

const addSibling = (id: string) => ({
  type: 'click/add_sibling' as const,
  payload: id
});

const deleteNode = (id: string) => ({
  type: 'click/delete_node' as const,
  payload: id
});

// node operations
const changeTitle = (id: string, title: string) => ({
  type: 'type/change_title' as const,
  payload: {
    id,
    title,
  }
});

const pickBackgroundColor = (id: string, backgroundColor: string) => ({
  type: 'pick/change_background_color' as const,
  payload: {
    id,
    backgroundColor
  }
});

const pickFontColor = (id: string, fontColor: string) => ({
  type: 'pick/change_font_color' as const,
  payload: {
    id,
    fontColor,
  }
});

const editWidth = (id: string, width: number) => ({
  type: 'pick/change_width' as const,
  payload: {
    id,
    width,
  }
});

const editHeight = (id: string, height: number) => ({
  type: 'pick/change_height' as const,
  payload: {
    id,
    height,
  }
});

const pickFontSize = (id: string, fontSize: number) => ({
  type: 'pick/change_font_size' as const,
  payload: {
    id,
    fontSize,
  }
});

const chartActions = {
  addNode,
  addSibling,
  deleteNode,

  changeTitle,
  pickBackgroundColor,
  pickFontColor,
  editWidth,
  editHeight,
  pickFontSize,
};

export type ChartActionType = ReturnType<typeof chartActions[keyof typeof chartActions]>;

export default chartActions;