import React from 'react';

import { NodeT } from './types';

const Node: React.FC<{ node: NodeT }> = ({ node }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: node.color,
          width: node.width,
          height: node.height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {node.title}
      </div>
      {node.children.map(child => <Node node={child} />)}
    </>
  );
};

export default Node;