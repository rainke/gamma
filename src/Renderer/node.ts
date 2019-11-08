import * as d3 from 'd3';
import { GammaNode } from '../types';
import { Setting } from '../setting';

const renderNode = (node: GammaNode, context: CanvasRenderingContext2D, setting: Setting) => {
  const nodeSize = node.size || (setting('nodeSize') as number);
  const nodeColor = node.color || (setting('nodeColor') as string);
  context.beginPath();
  context.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
  context.closePath();
  context.fillStyle = nodeColor;
  context.fill();
};

export default renderNode;
