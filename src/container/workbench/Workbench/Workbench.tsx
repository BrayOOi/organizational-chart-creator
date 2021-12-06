import React, { useReducer } from 'react';

import Node from '../Node';
import Sidebar from '../Sidebar';
import { chartReducer, INITIAL_CHART_STATE } from './workbenchState/reducer';
import chartActions from './workbenchState/actions';

import localDispatchDecorator from '../../../utils/localDispatchDecorator';

const Workbench: React.FC<{}> = () => {
  const [chartState, localDispatch] = useReducer(chartReducer, INITIAL_CHART_STATE);
  const snapshotIndex = chartState.state.selectedSnapshotIndex;
  const canRedo = chartState.state.historyStack.length - 1 !== snapshotIndex;

  const localDispatchAction = localDispatchDecorator(localDispatch);

  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          transform: 'translate(50%, 50%)',
        }}>
        <Node
          node={chartState.state.historyStack[snapshotIndex]}
          onClick={localDispatchAction(chartActions.selectNode)}
          selectedNodeID={chartState.state.selectedNodeID[snapshotIndex]}
        />
      </div>
      <div
        style={{
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0
        }}
      >
      <Sidebar
        state={chartState.state.historyStack[snapshotIndex]}
        selectedNodeID={chartState.state.selectedNodeID[snapshotIndex]}
        canUndo={!!snapshotIndex}
        canRedo={canRedo}
        onAddChild={localDispatchAction(chartActions.addNode)}
        onCopy={localDispatchAction(chartActions.addSibling)}
        onDelete={localDispatchAction(chartActions.deleteNode)}
        onUndo={localDispatchAction(chartActions.undoChart)}
        onRedo={localDispatchAction(chartActions.redoChart)}

        onTitleChange={id => payload => localDispatch(chartActions.changeTitle(id, payload))}
        onBackgroundColorChange={id => payload => localDispatch(chartActions.pickBackgroundColor(id, payload))}
        onFontColorChange={id => payload => localDispatch(chartActions.pickFontColor(id, payload))}
        onWidthChange={id => payload => localDispatch(chartActions.editWidth(id, payload))}
        onHeightChange={id => payload => localDispatch(chartActions.editHeight(id, payload))}
        onFontSizeChange={id => payload => localDispatch(chartActions.pickFontSize(id, payload))}
      />
      </div>
    </>
  );
};

export default Workbench;
