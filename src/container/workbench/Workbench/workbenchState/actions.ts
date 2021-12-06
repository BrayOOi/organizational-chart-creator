import { NodeT } from "../../Node/types";

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

const undoChart = () => ({
  type: 'click/undo' as const
});

const redoChart = () => ({
  type: 'click/redo' as const
});

// node operations
const selectNode = (node: NodeT) => ({
  type: 'click/select_node' as const,
  payload: node
});

const changeTitle = (id: string, title: string) => ({
  type: 'type/change_title' as const,
  payload: {
    id,
    payload: title,
  }
});

const pickBackgroundColor = (id: string, backgroundColor: string) => ({
  type: 'pick/change_background_color' as const,
  payload: {
    id,
    payload: backgroundColor
  }
});

const pickFontColor = (id: string, fontColor: string) => ({
  type: 'pick/change_font_color' as const,
  payload: {
    id,
    payload: fontColor,
  }
});

const editWidth = (id: string, width: number) => ({
  type: 'pick/change_width' as const,
  payload: {
    id,
    payload: width,
  }
});

const editHeight = (id: string, height: number) => ({
  type: 'pick/change_height' as const,
  payload: {
    id,
    payload: height,
  }
});

const pickFontSize = (id: string, fontSize: number) => ({
  type: 'pick/change_font_size' as const,
  payload: {
    id,
    payload: fontSize,
  }
});

const chartActions = {
  addNode,
  addSibling,
  deleteNode,
  undoChart,
  redoChart,

  selectNode,
  changeTitle,
  pickBackgroundColor,
  pickFontColor,
  editWidth,
  editHeight,
  pickFontSize,
};

export type ChartActionType = ReturnType<typeof chartActions[keyof typeof chartActions]>;

export default chartActions;