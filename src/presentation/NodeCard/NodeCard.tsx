import React from 'react';
import { Button, Card, CardActions, CardContent, Divider, Fab, Grid, Slider, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { NodeT } from '../../container/workbench/Node/types';

interface NodeCardProps {
  node: NodeT
}

const NodeCard: React.FC<NodeCardProps> = ({
  node
}) => (
  <Card variant="outlined" style={{ width: '100%', height: 'fit-content', gap: 10 }}>
    <CardContent>
      <Grid container direction="column" style={{ gap: 20 }}>
        <Grid item>
          <Typography>Title</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            value={node.title}
            onChange={e => {}}
          />
        </Grid>

        <Grid item>
          <Typography style={{ marginBottom: 5 }}>Color</Typography>
          <input type="color" onChange={e => console.log(e.target.value)} />
        </Grid>

        <Grid item container>
          <Typography style={{ marginBottom: 10 }}>Size</Typography>
          <Slider
            aria-label="Node size"
            defaultValue={30}
            min={30}
            max={100}
            style={{
              width: '90%',
              margin: 'auto'
            }}
            valueLabelDisplay="on"
          />
        </Grid>
      </Grid>
    </CardContent>

    <Divider variant="middle" />

    <CardActions style={{ padding: 12 }}>
      <Grid container justifyContent="flex-end" gap={1}>
        <Fab color="primary" size="small" aria-label="add">
          <AddIcon fontSize="small" />
        </Fab>
        <Fab color="primary" size="small" aria-label="copy">
          <ContentCopyIcon fontSize="small" />
        </Fab>
        <Fab color="primary" size="small" aria-label="delete">
          <DeleteIcon fontSize="small" />
        </Fab>
      </Grid>
    </CardActions>
  </Card>
);

export default NodeCard;
