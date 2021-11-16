import produce from 'immer';
import stateT from '../../../../types/stateT';
import { NodeT } from '../../Node/types';
import { ChartActionType } from './actions';

export const INITIAL_CHART_STATE: stateT<NodeT> = {
  payload: {
    title: '',
    color: '#ffffff',
    size: 30,
    coords: true,
    children: [],
  },
  validation: {

  }
};

export const chartReducer = (
  state = INITIAL_CHART_STATE,
  action: ChartActionType,
) => {
  switch (action.type) {
    case 'click/add_node':
      return produce(state, draft => {

      });
    default:
      return state;
  }
};
