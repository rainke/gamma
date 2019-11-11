import { legendItem } from '../types';
export default (legend: legendItem[], ctx: CanvasRenderingContext2D, width: number) => {
  ctx.save();
  let legendWidth = 0;
  let w = 20;
  let h = 12;
  let top = 10;
  ctx.font = '14px sans-serif';
  const legendDetails = legend.map(l => {
    const textWidth = ctx.measureText(l.name).width;
    const x = legendWidth;
    legendWidth += w + 5 + textWidth + 10;
    return { ...l, textWidth, x };
  });
  const startX = (width - legendWidth) / 2;
  legendDetails.forEach((l, idx) => {
    ctx.fillStyle = l.color;
    ctx.fillRect(startX + l.x, top, w, h);
    ctx.textBaseline = 'middle'
    ctx.fillText(l.name, startX + l.x + w + 5, top + h / 2)
  });
  ctx.restore();
};
