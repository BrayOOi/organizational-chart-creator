import React, { useReducer } from 'react';
import { Grid } from '@mui/material';

import Node from '../Node';
import Sidebar from '../Sidebar';
import { chartReducer, INITIAL_CHART_STATE } from './workbenchState/reducer';

const Workbench: React.FC<{}> = () => {
  const [chartState, dispatch] = useReducer(chartReducer, INITIAL_CHART_STATE);

  return (
    <Grid container style={{ height: '100vh', backgroundColor: 'grey' }}>
      <Grid item flexGrow={2}>
        <Node node={chartState.payload} />
      </Grid>
      <Sidebar state={chartState.payload} />
    </Grid>
  );
};

export default Workbench;
