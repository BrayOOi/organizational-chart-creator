import React, { useEffect, useRef } from 'react';
import { Divider, Fab, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NodeCard from '../../../presentation/NodeCard/NodeCard';
import { NodeT } from '../Node/types';
import { flattenTree } from '../Node/utils';

interface SidebarProps {
  state: NodeT;
  selectedNodeID: string;
  canUndo: boolean;
  canRedo: boolean;
  onAddChild: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onUndo: () => void;
  onRedo: () => void;

  onTitleChange: (id: string) => (title: string) => void;
  onBackgroundColorChange: (id: string) => (color: string) => void;
  onFontColorChange: (id: string) => (color: string) => void;
  onWidthChange: (id: string) => (size: number) => void;
  onHeightChange: (id: string) => (size: number) => void;
  onFontSizeChange: (id: string) => (size: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  state,
  selectedNodeID,
  canUndo,
  canRedo,
  onAddChild,
  onCopy,
  onDelete,
  onUndo,
  onRedo,

  onTitleChange,
  onBackgroundColorChange,
  onFontColorChange,
  onWidthChange,
  onHeightChange,
  onFontSizeChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
      Array.prototype.slice.call(ref.current.children)
        .find(child => child.id === selectedNodeID)
        .scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedNodeID]);

  return (
    <Grid item container direction="column" style={{
      backgroundColor: 'white',
      margin: '20px 20px 20px 0',
      height: 'calc(100% - 40px)',
      width: 280,
      borderRadius: 10,
      padding: 20,
      gap: 20 }}>
      <Grid item container style={{ justifyContent: 'space-between' }}>
        <Fab
          color="primary"
          size="medium"
          aria-label="undo"
          disabled={!canUndo}
          onClick={onUndo}
        >
          <KeyboardArrowLeftIcon />
        </Fab>
        <Fab
          color="primary"
          size="medium"
          aria-label="redo"
          disabled={!canRedo}
          onClick={onRedo}
        >
          <KeyboardArrowRightIcon />
        </Fab>
        <Fab color="primary" size="medium" aria-label="save">
          <SaveIcon />
        </Fab>
        <Fab color="primary" size="medium" aria-label="share">
          <ShareIcon />
        </Fab>
      </Grid>

      <Divider />

      <Grid
        item
        container
        ref={ref}
        style={{
          overflowY: 'scroll',
          height: '88%',
          gap: 10
        }}>
        {flattenTree(state).map((node, index) => (
          <NodeCard
            id={node.id}
            key={node.id}
            title={node.title}
            backgroundColor={node.backgroundColor}
            fontColor={node.fontColor}
            width={node.width}
            height={node.height}
            fontSize={node.fontSize}
            isSelected={node.id === selectedNodeID}

            onTitleChange={onTitleChange(node.id)}
            onBackgroundColorChange={onBackgroundColorChange(node.id)}
            onFontColorChange={onFontColorChange(node.id)}
            onWidthChange={onWidthChange(node.id)}
            onHeightChange={onHeightChange(node.id)}
            onFontSizeChange={onFontSizeChange(node.id)}

            onAddChild={() => onAddChild(node.id)}
            disableCopy={!index}
            onCopy={() => onCopy(node.id)}
            disableDelete={!index}
            onDelete={() => onDelete(node.id)}
          />))}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
