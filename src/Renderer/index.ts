import { Selection, zoom, zoomIdentity, event, select, D3ZoomEvent } from 'd3';
import renderNode from './node';
import renderLink from './link';
import renderHover from './hover';
import renderLegend from './legend';
import ForceManager from '../forceManager';
import { GammaGraph, GammaNode, legendItem, Tooltip, Overall } from '../types';
import { Setting } from '../setting';

type ContextKeys = 'hover' | 'scene';

type Contexts = { [key in ContextKeys]?: CanvasRenderingContext2D };

interface RenderOption {
  width?: number;
  height: number;
  legend?: legendItem[];
  tooltip?: Tooltip;
  overall?: Overall
}

class Renderer {
  private canvas: Selection<HTMLCanvasElement, string, HTMLElement, any>;
  private zoom = zoom<HTMLCanvasElement, string>()
    .scaleExtent([0.1, 4])
    .on('zoom', this.zooming.bind(this));
  private contexts: Contexts = {};
  private transfrom = zoomIdentity;
  private hoveredNode: GammaNode = null;
  private hoveredTargets: GammaNode[] = [];
  private width!: number;
  private tooltip: d3.Selection<HTMLPreElement, any, any, any>;
  private overall: d3.Selection<HTMLDivElement, any, any, any>;
  private tooltipFormat = function(node: GammaNode) {return JSON.stringify(node, null, 2)}
  private overallFormat = function(graph: GammaGraph) {return `节点总数：${graph.nodes.length}`}
  constructor(
    private manager: ForceManager,
    private setting: Setting,
    private container: string,
    private option: RenderOption
  ) {
    const defaultWidth = parseInt(select(container).style('width'));
    if(option.tooltip && option.tooltip.format) {
      this.tooltipFormat = option.tooltip.format;
    }
    if(option.overall && option.overall.format) {
      this.overallFormat = option.overall.format;
    }
    this.width = option.width || defaultWidth;
    this.canvas = select(container)
      .append('div')
      .attr('class', 'gamma-container')
      .style('height', `${this.option.height}px`)
      .style('position', 'relative')
      .selectAll('canvas')
      .data(['gamma-scene', 'gamma-hover'])
      .enter()
      .append('canvas')
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .attr('width', this.width)
      .attr('height', option.height)
      .attr('class', function(d) {
        return d;
      })
      .call(this.zoom);

    this.tooltip = select(container)
      .select('.gamma-container')
      .append('pre')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('top', 0)
      .style('right', 0)
      .style('width', '300px');

    this.overall = select(container)
      .select('.gamma-container')
      .append('div')
      .style('position', 'absolute')
      .style('left', 0)
      .style('bottom', 0)
      .style('width', '250px')
      .style('padding', '10px')

    this.canvas.filter(item => item === 'gamma-hover').on('mousemove click', this.handleMouse);

    const [scene, hover] = this.canvas.nodes().map(cvs => cvs.getContext('2d'));
    this.contexts.scene = scene;
    this.contexts.hover = hover;
    this.zoom.translateBy(this.canvas, this.width / 2, option.height / 2);

    manager.on('tick', () => {
      this.render();
      this.hoveredNode && this.renderHover();
    }).on('layout', () => {
      this.tooltip.style('display', 'none');
      this.overall.html(this.overallFormat(this.manager.graph))
    })

    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    const width = parseInt(select(this.container).style('width'));
    this.zoom.translateBy(this.canvas, (width - this.width) / 2, 0);
    this.width = this.option.width || width;
    this.canvas.attr('width', this.width);
    this.render();
  };

  handleMouse = () => {
    const { x, y, k } = this.transfrom;
    const { layerX, layerY, type } = event;
    const [graphX, graphY] = [(layerX - x) / k, (layerY - y) / k];
    const nearestNode = this.manager.find(graphX, graphY);
    const size = nearestNode.size || this.setting('nodeSize');
    if ((graphX - nearestNode.x) ** 2 + (graphY - nearestNode.y) ** 2 <= size ** 2) {
      this.hoveredTargets = this.manager.graph.links
        .filter(link => {
          return link.source === nearestNode;
        })
        .map(link => link.target as GammaNode);

      this.hoveredNode = nearestNode;
      this.renderHover();
      if (type === 'click') {
        this.tooltip.style('display', 'block').text(this.tooltipFormat(nearestNode));
      }
    } else {
      this.hoveredNode = null;
      this.hoveredTargets = [];
      this.clear('hover');
      if (type === 'click') {
        this.tooltip.style('display', 'none');
      }
    }
  };

  zooming() {
    this.transfrom = (event as D3ZoomEvent<HTMLCanvasElement, any>).transform;
    if (!this.manager.simulationIsRuning) {
      this.render();
    }
    this.hoveredNode && this.renderHover();
  }

  setTransfrom(ctx: CanvasRenderingContext2D) {
    const { x, y, k } = this.transfrom;
    ctx.translate(x, y);
    ctx.scale(k, k);
  }

  renderHover() {
    this.clear('hover');
    this.contexts.hover.save();
    this.setTransfrom(this.contexts.hover);
    this.hoveredTargets.forEach(node => {
      renderLink({ ...this.hoveredNode, linkColor: 'pink' }, node, this.contexts.hover, this.setting);
      renderHover({ ...node, color: 'pink' }, this.contexts.hover, this.transfrom, this.setting, { label: false });
    });
    renderHover(this.hoveredNode, this.contexts.hover, this.transfrom, this.setting);
    this.contexts.hover.restore();
  }

  render() {
    this.clear('scene');
    this.contexts.scene.save();
    this.setTransfrom(this.contexts.scene);
    this.manager.graph.links.forEach(link => {
      renderLink(link.source as GammaNode, link.target as GammaNode, this.contexts.scene, this.setting);
    });
    this.manager.graph.nodes.forEach(node => {
      renderNode(node, this.contexts.scene, this.setting);
    });

    this.contexts.scene.restore();

    if (this.option.legend) {
      this.renderLegend();
    }
  }

  renderLegend() {
    renderLegend(this.option.legend, this.contexts.scene, this.width);
  }

  clear(cond: true | ContextKeys) {
    const { height } = this.option;
    if (cond === true) {
      for (let context in this.contexts) {
        this.contexts[context as ContextKeys].clearRect(0, 0, this.width, height);
      }
    } else {
      this.contexts[cond].clearRect(0, 0, this.width, height);
    }
  }

  destory() {
    window.removeEventListener('resize', this.resize);
    this.zoom.on('zoom', null);
    this.canvas.filter(item => item === 'gamma-hover').on('mousemove click', null);
  }
}

export default Renderer;
