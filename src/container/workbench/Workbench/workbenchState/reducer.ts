import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import stateT from '../../../../types/stateT';
import { NodeT } from '../../Node/types';
import { ChartActionType } from './actions';

export const INITIAL_NODE = (
  title = 'You are here!'
) => ({
  id: uuidv4(),
  title,
  color: '#ffffff',
  width: 300,
  height: 150,
  coords: true,
  children: [],
});

export const INITIAL_CHART_STATE: stateT<NodeT> = {
  payload: INITIAL_NODE(),
  validation: {

  }
};

export const chartReducer = (
  state = INITIAL_CHART_STATE,
  action: ChartActionType,
) => {
  switch (action.type) {
    case 'click/add_child':
      return produce(state, draft => {
        
      });
    default:
      return state;
  }
};
