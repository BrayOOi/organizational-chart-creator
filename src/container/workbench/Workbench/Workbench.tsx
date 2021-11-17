import React, { useReducer } from 'react';
import { Grid } from '@mui/material';

import Node from '../Node';
import Sidebar from '../Sidebar';
import { chartReducer, INITIAL_CHART_STATE } from './workbenchState/reducer';
import chartActions from './workbenchState/actions';

import localDispatchDecorator from '../../../utils/localDispatchDecorator';

const Workbench: React.FC<{}> = () => {
  const [chartState, localDispatch] = useReducer(chartReducer, INITIAL_CHART_STATE);

  const localDispatchAction = localDispatchDecorator(localDispatch);

  return (
    <Grid container style={{ height: '100vh', backgroundColor: 'grey' }}>
      <Grid item flexGrow={2}>
        <Node node={chartState.payload} />
      </Grid>
      <Sidebar
        state={chartState.payload}
        onAddChild={localDispatchAction(chartActions.addNode)}
        onCopy={localDispatchAction(chartActions.addSibling)}
        onDelete={localDispatchAction(chartActions.deleteNode)}

        onTitleChange={id => payload => localDispatch(chartActions.changeTitle(id, payload))}
        onBackgroundColorChange={id => payload => localDispatch(chartActions.pickBackgroundColor(id, payload))}
        onFontColorChange={id => payload => localDispatch(chartActions.pickFontColor(id, payload))}
        onWidthChange={id => payload => localDispatch(chartActions.editWidth(id, payload))}
        onHeightChange={id => payload => localDispatch(chartActions.editHeight(id, payload))}
        onFontSizeChange={id => payload => localDispatch(chartActions.pickFontSize(id, payload))}
      />
    </Grid>
  );
};

export default Workbench;
