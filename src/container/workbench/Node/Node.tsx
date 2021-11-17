import React from 'react';

import { NodeT } from './types';

const Node: React.FC<{ node: NodeT }> = ({ node }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: node.backgroundColor,
          color: node.fontColor,
          width: node.width,
          height: node.height,
          fontSize: node.fontSize,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {node.title}
      </div>
      {node.children.map(child => <Node key={child.id} node={child} />)}
    </>
  );
};

export default Node;