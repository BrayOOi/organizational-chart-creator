import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import stateT from '../../../../types/stateT';
import { NodeT } from '../../Node/types';
import { findNode, findNodeParent } from '../../Node/utils';
import { ChartActionType } from './actions';

const KEY_MAP: Partial<Record<ChartActionType["type"], keyof NodeT>> = {
  'type/change_title': 'title',
  'pick/change_background_color': 'backgroundColor',
  'pick/change_font_color': 'fontColor',
  'pick/change_width': 'width',
  'pick/change_height': 'height',
  'pick/change_font_size': 'fontSize',
};

const PADDING = 50;

export const INITIAL_NODE = ({
  title = '',
  x = 0,
  y = 0,
}): NodeT => ({
  id: uuidv4(),
  title,
  backgroundColor: '#ffffff',
  fontColor: '#000000',
  width: 300,
  height: 150,
  fontSize: 16,
  x,
  y,
  children: [],
});

const GENESIS_NODE = INITIAL_NODE({
  title: 'You are here!',
  x: 0,
  y: 0
});

type chartStateType = stateT<
  { 
    selectedNodeID: Array<string>;
    historyStack: Array<NodeT>;
    selectedSnapshotIndex: number;
  }, 
  NodeT
>;

export const INITIAL_CHART_STATE: chartStateType = {
  state: {
    selectedNodeID: [GENESIS_NODE.id],
    historyStack: [GENESIS_NODE],
    selectedSnapshotIndex: 0
  },
  payload: GENESIS_NODE,
  validation: {

  }
};

export const chartReducer = (
  state = INITIAL_CHART_STATE,
  action: ChartActionType,
) => {
  switch (action.type) {
    // chart operations
    case 'click/add_child':
      return produce(state, draft => {
        let targetNode = findNode(draft.payload, action.payload);

        if (targetNode) {
          const newChild = INITIAL_NODE({
            title: `Child ${targetNode.children.length + 1}`,
            y: targetNode.y + targetNode.height + 100,
          })
          targetNode.children.push(newChild);

          updateChildrenPositions(draft.payload);
          updateHistory(draft, newChild.id);
        };
      });
    case 'click/add_sibling':
      return produce(state, draft => {
        let parentNode = findNodeParent(draft.payload, action.payload);
        let targetNode = parentNode?.children.find(child => child.id === action.payload);
        
        if (parentNode && targetNode) {
          const newChild = INITIAL_NODE({
            title: `Node ${targetNode.children.length + 1}`,
            y: parentNode.y + parentNode.height + 100,
          });

          parentNode.children.push(newChild);

          updateChildrenPositions(draft.payload);
          updateHistory(draft, newChild.id);
        }
      });
    case 'click/delete_node':
      return produce(state, draft => {
        let parentNode = findNodeParent(draft.payload, action.payload);

        if (parentNode) {
          let targetNodeIndex = parentNode.children.findIndex(child => child.id === action.payload);

          if (targetNodeIndex >= 0) {
            parentNode.children.splice(targetNodeIndex, 1);

            updateChildrenPositions(draft.payload);
            updateHistory(draft, parentNode.id);
          }
        }
      });
    case 'click/undo':
      return produce(state, draft => {
        if (draft.state.selectedSnapshotIndex - 1 >= 0) {
          draft.payload = draft.state.historyStack[draft.state.selectedSnapshotIndex - 1];
          draft.state.selectedSnapshotIndex--;
        }
      });
    case 'click/redo':
      return produce(state, draft => {
        if (draft.state.selectedSnapshotIndex < draft.state.historyStack.length - 1) {
          draft.payload = draft.state.historyStack[draft.state.selectedSnapshotIndex + 1];
          draft.state.selectedSnapshotIndex++;
        }
      });

    // node operations
    case 'click/select_node':
      return produce(state, draft => {
        updateHistory(draft, action.payload.id);
      });
    case 'pick/change_width':
      return produce(state, draft => {
        let targetNode = findNode(draft.payload, action.payload.id);

        assignPayload(KEY_MAP[action.type], action.payload.payload, targetNode);

        updateChildrenPositions(draft.payload);
        updateHistory(draft, action.payload.id);
      });
    case 'type/change_title':
    case 'pick/change_background_color':
    case 'pick/change_font_color':
    case 'pick/change_height':
    case 'pick/change_font_size':
      return produce(state, draft => {
        let targetNode = findNode(draft.payload, action.payload.id);

        assignPayload(KEY_MAP[action.type], action.payload.payload, targetNode);
        updateHistory(draft, action.payload.id);
      });
    default:
      return state;
  }
};

function assignPayload<K extends keyof NodeT>(key: K | undefined, value: NodeT[K], node: NodeT | undefined) {
  if (node && key) {
    node[key] = value;
  }
}

function updateChildrenPositions(parentNode: NodeT) {
  const totalWidth = getEffectiveWidth(parentNode);

  // adjust all x1s so that the children are centered from parent
  const midPoint = totalWidth / 2;
  const parentMidPoint = parentNode.x + (parentNode.width / 2);

  let accumWidth = 0;

  parentNode.children.forEach((child, index) => {
    const effectiveWidth = getEffectiveWidth(child);
    // this space will ensure child to stay at the center if child.children.length
    const padding = Math.max((effectiveWidth - child.width) / 2, (parentNode.width - effectiveWidth) / 2);
    child.x = parentMidPoint - midPoint + accumWidth + padding + (index ? PADDING: 0);
    child.title = `x1: ${parentMidPoint - midPoint + accumWidth + padding + (index ? PADDING: 0)} width: ${effectiveWidth}`;
    accumWidth += effectiveWidth + (index ? PADDING: 0);

    if (child.children.length) {
      updateChildrenPositions(child);
    }
  });
}

export function getEffectiveWidth(parentNode: NodeT): number {
  const childrenLength = parentNode.children.length;

  if (!childrenLength) {
    return parentNode.width;
  } else {
    const childrenEffectiveWidth = parentNode.children.reduce((accumWidth, node, index) => 
      accumWidth + getEffectiveWidth(node) + (index ? PADDING: 0)
    , 0);

    return childrenEffectiveWidth >= parentNode.width ? childrenEffectiveWidth : parentNode.width;
  }
}

function updateHistory(draft: chartStateType, nextSelectedId: string) {
  if (draft.state.selectedSnapshotIndex < draft.state.historyStack.length - 1) {
    draft.state.historyStack = draft.state.historyStack.slice(0, draft.state.selectedSnapshotIndex + 1);
    draft.state.selectedNodeID = draft.state.selectedNodeID.slice(0, draft.state.selectedSnapshotIndex + 1);
  }

  draft.state.historyStack.push(draft.payload);
  draft.state.selectedNodeID.push(nextSelectedId);
  draft.state.selectedSnapshotIndex++;
};
