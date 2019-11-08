import { GammaNode } from '../types';
import { Setting } from '../setting';

const renderHover = (
  node: GammaNode,
  context: CanvasRenderingContext2D,
  transform: d3.ZoomTransform,
  setting: Setting
) => {
  const nodeSize = node.size || setting('nodeSize');
  const hoverNodeColor = node.color || setting('hoverNodeColor');
  const hoverLabelColor = setting('hoverLabelColor');
  const hoverLabel = setting('hoverLabel');
  context.beginPath();
  context.arc(node.x, node.y, nodeSize + 1, 0, 2 * Math.PI);
  context.closePath();
  context.fillStyle = hoverNodeColor;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 8;
  context.shadowColor = '#666';
  context.fill();
  const text = node[hoverLabel] as string;
  if (text) {
    const fontSize = 14 / transform.k;
    context.font = `${fontSize}px sans-serif`;
    context.fillStyle = hoverLabelColor;
    context.fillText(text, node.x + nodeSize + 2, node.y + fontSize / 3);
  }
};

export default renderHover;
