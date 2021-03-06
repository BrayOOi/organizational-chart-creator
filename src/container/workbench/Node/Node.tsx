import React from 'react';

import { getEffectiveWidth } from '../Workbench/workbenchState/reducer';

import { NodeT } from './types';

interface NodeProps {
  node: NodeT;
  onClick: (node: NodeT) => void;
  selectedNodeID: string;
}

const Node: React.FC<NodeProps> = ({
  node,
  onClick,
  selectedNodeID,
}) => {
  const isSelected = node.id === selectedNodeID;
  const midPointX = node.x + (node.width / 2);

  const effectiveWidth = getEffectiveWidth(node);

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
          zIndex: 2,

          position: 'absolute',
          top: node.y,
          left: node.x
        }}
        onClick={() => onClick(node)}
      >
        {node.title}
      </div>

      {!!node.children.length && (
        <svg
          height={node.height + 1000}
          width={effectiveWidth}
          style={{
            position: 'absolute',
            top: node.y,
            left: midPointX - (effectiveWidth / 2),
          }}>
          {node.children.map(child => (
            <line
              key={`${child.id}-path`}
              x1={effectiveWidth / 2}
              y1={node.height}
              x2={effectiveWidth / 2 + (child.x + child.width/2 - node.x - node.width/2)}
              y2={node.height + 100}
              style={{
                stroke: 'black',
                strokeWidth: 2
              }}
            />
          ))}
        </svg>
      )}
      {node.children.map(child => (
        <Node
          key={child.id}
          node={child}
          onClick={onClick}
          selectedNodeID={selectedNodeID}
        />
      ))}
    </>
  );
};

export default Node;