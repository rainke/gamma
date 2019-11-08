import {SimulationLinkDatum} from 'd3';
import { GammaNode } from '../types';
import { Setting } from '../setting';

const renderLink = (
  source: GammaNode,
  target: GammaNode,
  ctx: CanvasRenderingContext2D,
  setting: Setting
) => {
  ctx.beginPath();
  ctx.moveTo(source.x, source.y)
  ctx.lineTo(target.x, target.y)
  ctx.closePath();
  ctx.strokeStyle = source.linkColor || '#ccc';
  ctx.stroke()
};

export default renderLink;
