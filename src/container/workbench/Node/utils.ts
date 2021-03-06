import { NodeT } from "./types";

export function flattenTree(node: NodeT): Array<NodeT> {
  if (node.children.length) {
    return [node, ...node.children.flatMap(child => flattenTree(child))];
  } else {
    return [node];
  }
}

export function findNode(node: NodeT, id: string): NodeT | undefined {
  if (node.id === id) {
    return node;
  } else {
    let targetNode;
    node.children.forEach(child => {
      let result = findNode(child, id);

      if (result) {
        targetNode = result;
      }
    });
    return targetNode;
  }
}

export function findNodeParent(node: NodeT, id: string): NodeT | undefined {
  if (node.children.length) {
    if (node.children.find(child => child.id === id)) {
      return node;
    } else {
      let targetNode;

      node.children.forEach(child => {
        let result = findNodeParent(child, id);

        if (result) {
          targetNode = result;
        }
      });

      return targetNode;
    }
  } else {
    return undefined;
  }
}