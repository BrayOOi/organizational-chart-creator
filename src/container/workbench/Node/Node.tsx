import React from 'react';

import { NodeT } from './types';

interface NodeProps {
  node: NodeT;
  onClick: (node: NodeT) => void;
  selectedNode: NodeT;
}

const Node: React.FC<NodeProps> = ({
  node,
  onClick,
  selectedNode,
}) => {
  const isSelected = node.id === selectedNode.id;

  return (
    <>
      <div
        style={{
          backgroundColor: node.backgroundColor,
          color: node.fontColor,
          width: node.width,
          height: node.height,
          fontSize: node.fontSize,
          border: isSelected ? `3px solid black` : undefined,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          position: 'absolute',
          top: -node.height/2 + node.y,
          left: -node.width/2 - (320/2) + node.x
        }}
        onClick={() => onClick(node)}
      >
        {node.title}
      </div>
      {node.children.map(child => (
        <Node
          key={child.id}
          node={child}
          onClick={onClick}
          selectedNode={selectedNode}
        />))}
    </>
  );
};

export default Node;