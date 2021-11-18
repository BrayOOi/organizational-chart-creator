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

export const INITIAL_NODE = (
  title = '',
) => ({
  id: uuidv4(),
  title,
  backgroundColor: '#ffffff',
  fontColor: '#000000',
  width: 300,
  height: 150,
  fontSize: 16,
  coords: true,
  children: [],
});

export const INITIAL_CHART_STATE: stateT<NodeT> = {
  payload: INITIAL_NODE('You are here!'),
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
          targetNode.children.push(INITIAL_NODE(`Child ${targetNode.children.length + 1}`));
        }
      });
    case 'click/add_sibling':
      return produce(state, draft => {
        let parentNode = findNodeParent(draft.payload, action.payload);
        let targetNode = parentNode?.children.find(child => child.id === action.payload);
        
        if (parentNode && targetNode) {
          parentNode.children.push(targetNode);
        }
      });
    case 'click/delete_node':
      return produce(state, draft => {
        let parentNode = findNodeParent(draft.payload, action.payload);

        if (parentNode) {
          let targetNodeIndex = parentNode.children.findIndex(child => child.id === action.payload);

          if (targetNodeIndex >= 0) {
            parentNode.children.splice(targetNodeIndex, 1);
          }
        }
      });

    // node operations
    case 'type/change_title':
    case 'pick/change_background_color':
    case 'pick/change_font_color':
    case 'pick/change_width':
    case 'pick/change_height':
    case 'pick/change_font_size':
      return produce(state, draft => {
        let targetNode = findNode(draft.payload, action.payload.id);

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
