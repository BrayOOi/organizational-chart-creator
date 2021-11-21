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

export const INITIAL_CHART_STATE: stateT<{ selectedNodeID: string }, NodeT> = {
  state: {
    selectedNodeID: GENESIS_NODE.id,
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

          draft.state.selectedNodeID = newChild.id;

          updateChildrenPositions(targetNode);
        }
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

          draft.state.selectedNodeID = newChild.id;
          
          updateChildrenPositions(draft.payload);
        }
      });
    case 'click/delete_node':
      return produce(state, draft => {
        let parentNode = findNodeParent(draft.payload, action.payload);

        if (parentNode) {
          let targetNodeIndex = parentNode.children.findIndex(child => child.id === action.payload);

          if (targetNodeIndex >= 0) {
            parentNode.children.splice(targetNodeIndex, 1);

            draft.state.selectedNodeID = parentNode.id;

            updateChildrenPositions(parentNode);
          }
        }
      });

    // node operations
    case 'click/select_node':
      return produce(state, draft => {
        draft.state.selectedNodeID = action.payload.id;
      });
    case 'pick/change_width':
      return produce(state, draft => {
        let targetNode = updateSelectedNode(draft, action.payload.id);
        const parentNode = findNodeParent(draft.payload, action.payload.id);

        assignPayload(KEY_MAP[action.type], action.payload.payload, targetNode);

        if (parentNode) {
          updateChildrenPositions(parentNode);
        }
      });
    case 'type/change_title':
    case 'pick/change_background_color':
    case 'pick/change_font_color':
    case 'pick/change_height':
    case 'pick/change_font_size':
      return produce(state, draft => {
        let targetNode = updateSelectedNode(draft, action.payload.id);

        assignPayload(KEY_MAP[action.type], action.payload.payload, targetNode);
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
  let unadjustedNextXs: Array<number> = [];
  const childrenLength = parentNode.children.length;

  // record new unadjusted x1's of children
  // unadjusted X's are relative x positions to 1st child 0
  const totalWidth = parentNode.children.reduce((accumWidth, node, index) => {
    // the last accumWidth also serves as the unadjusted x1 of current node
    unadjustedNextXs.push(accumWidth);

    return accumWidth + node.width + (index === childrenLength -1 ? 0 : PADDING);
  }, 0);

  // adjust all x1s so that the children are centered from parent
  const midPoint = totalWidth / 2;
  const parentMidPoint = (parentNode.x + parentNode.width) / 2;

  parentNode.children.forEach((child, index) => {
    child.x = parentMidPoint - midPoint + unadjustedNextXs[index];
  });
}

function updateSelectedNode(state: typeof INITIAL_CHART_STATE, nextSelectedNodeID: string): NodeT | undefined {
  const targetNode = findNode(state.payload, nextSelectedNodeID);

  if (state.state.selectedNodeID !== nextSelectedNodeID) {

    if (targetNode) {
      state.state.selectedNodeID = nextSelectedNodeID;
    }
  }

  return targetNode;
}
