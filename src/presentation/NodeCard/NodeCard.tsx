import React from 'react';
import { Card, CardActions, CardContent, Divider, Fab, Grid, Slider, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { NodeT } from '../../container/workbench/Node/types';

interface NodeCardProps {
  id: string;
  title: NodeT["title"];
  backgroundColor: NodeT["backgroundColor"];
  fontColor: NodeT["fontColor"];
  width: NodeT["width"];
  height: NodeT["height"];
  fontSize: NodeT["fontSize"];

  isSelected: boolean;

  onTitleChange: (title: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onFontColorChange: (color: string) => void;
  onWidthChange: (size: number) => void;
  onHeightChange: (size: number) => void;
  onFontSizeChange: (size: number) => void;

  onAddChild: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

const NodeCard: React.FC<NodeCardProps> = ({
  id,
  title,
  backgroundColor,
  fontColor,
  width,
  height,
  fontSize,

  isSelected,

  onTitleChange,
  onBackgroundColorChange,
  onFontColorChange,
  onWidthChange,
  onHeightChange,
  onFontSizeChange,

  onAddChild,
  onDelete,
  onCopy
}) => (
  <Card
    id={id}
    variant="outlined"
    style={{
      width: '100%',
      height: 'fit-content',
      gap: 10,
      border: isSelected ? '1px solid black' : undefined,
    }}>
    <CardContent>
      <Grid container direction="column" style={{ gap: 20 }}>
        <Grid item>
          <Typography>Title</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            value={title}
            onChange={e => onTitleChange(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Typography style={{ marginBottom: 5 }}>Background Color</Typography>
          <input
            type="color"
            value={backgroundColor}
            onChange={e => onBackgroundColorChange(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Typography style={{ marginBottom: 5 }}>Font Color</Typography>
          <input
            type="color"
            value={fontColor}
            onChange={e => onFontColorChange(e.target.value)}
          />
        </Grid>

        <Grid item container>
          <Typography style={{ marginBottom: 10 }}>Width</Typography>
          <Slider
            aria-label="Container size"
            defaultValue={30}
            min={30}
            max={1000}
            style={{
              width: '90%',
              margin: 'auto'
            }}
            valueLabelDisplay="on"
            value={width}
            onChange={(_, size) => typeof size === 'number' && onWidthChange(size)}
          />
        </Grid>

        <Grid item container>
          <Typography style={{ marginBottom: 10 }}>Height</Typography>
          <Slider
            aria-label="Container size"
            defaultValue={30}
            min={30}
            max={1000}
            style={{
              width: '90%',
              margin: 'auto'
            }}
            valueLabelDisplay="on"
            value={height}
            onChange={(_, size) => typeof size === 'number' && onHeightChange(size)}
          />
        </Grid>

        <Grid item container>
          <Typography style={{ marginBottom: 10 }}>Font Size</Typography>
          <Slider
            aria-label="Font size"
            defaultValue={30}
            min={30}
            max={100}
            style={{
              width: '90%',
              margin: 'auto'
            }}
            valueLabelDisplay="on"
            value={fontSize}
            onChange={(_, size) => typeof size === 'number' && onFontSizeChange(size)}
          />
        </Grid>
      </Grid>
    </CardContent>

    <Divider variant="middle" />

    <CardActions style={{ padding: 12 }}>
      <Grid container justifyContent="flex-end" gap={1}>
        <Fab color="primary" size="small" aria-label="add" onClick={onAddChild}>
          <AddIcon fontSize="small" />
        </Fab>
        <Fab color="primary" size="small" aria-label="copy" onClick={onCopy}>
          <ContentCopyIcon fontSize="small" />
        </Fab>
        <Fab color="primary" size="small" aria-label="delete" onClick={onDelete}>
          <DeleteIcon fontSize="small" />
        </Fab>
      </Grid>
    </CardActions>
  </Card>
);

export default NodeCard;
