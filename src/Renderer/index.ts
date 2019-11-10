import {
  Selection,
  zoom,
  zoomIdentity,
  event,
  select,
  D3ZoomEvent,
  Simulation
} from 'd3';
import renderNode from './node';
import renderLink from './link';
import renderHover from './hover';
import ForceManager from '../forceManager';
import { GammaGraph, GammaNode } from '../types';
import { Setting } from '../setting';

type ContextKeys = 'hover' | 'scene';

type Contexts = { [key in ContextKeys]?: CanvasRenderingContext2D };

interface RenderOption {
  width: number;
  height: number;
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
  private selectedSource: GammaNode[] = [];
  constructor(
    private manager: ForceManager,
    private setting: Setting,
    container: string,
    private option: RenderOption
  ) {
    this.canvas = select(container)
      .append('div')
      .attr('class', 'gamma-container')
      .style('position', 'relative')
      .selectAll('canvas')
      .data(['gamma-scene', 'gamma-hover'])
      .enter()
      .append('canvas')
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .attr('width', option.width)
      .attr('height', option.height)
      .attr('class', function(d) {
        return d;
      })
      .call(this.zoom);

    this.canvas
      .filter(item => item === 'gamma-hover')
      .on('mousemove', () => {
        const { x, y, k } = this.transfrom;
        const { layerX, layerY, type } = event;
        const [graphX, graphY] = [(layerX - x) / k, (layerY - y) / k];
        const nearestNode = manager.find(graphX, graphY);
        if ((graphX - nearestNode.x) ** 2 + (graphY - nearestNode.y) ** 2 < 9) {
          this.hoveredTargets = this.manager.graph.links
            .filter(link => {
              return link.source === nearestNode;
            })
            .map(link => link.target as GammaNode);

          this.hoveredNode = nearestNode;
          this.renderHover();
        } else {
          this.hoveredNode = null;
          this.hoveredTargets = [];
          this.clear('hover');
        }
      });

    const [scene, hover] = this.canvas.nodes().map(cvs => cvs.getContext('2d'));
    this.contexts.scene = scene;
    this.contexts.hover = hover;
    this.zoom.translateBy(this.canvas, option.width / 2, option.height / 2);

    manager.on('tick', () => {
      this.render();
      this.hoveredNode && this.renderHover();
    });
  }

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
      renderLink(
        { ...this.hoveredNode, linkColor: 'pink' },
        node,
        this.contexts.hover,
        this.setting
      );
      renderHover(
        { ...node, color: 'pink' },
        this.contexts.hover,
        this.transfrom,
        this.setting,
        { label: false }
      );
    });
    renderHover(
      this.hoveredNode,
      this.contexts.hover,
      this.transfrom,
      this.setting
    );
    this.contexts.hover.restore();
  }

  render() {
    this.contexts.scene.clearRect(0, 0, this.option.width, this.option.height);
    this.contexts.scene.save();
    this.setTransfrom(this.contexts.scene);
    this.manager.graph.links.forEach(link => {
      renderLink(
        link.source as GammaNode,
        link.target as GammaNode,
        this.contexts.scene,
        this.setting
      );
    });
    this.manager.graph.nodes.forEach(node => {
      renderNode(node, this.contexts.scene, this.setting);
    });
    this.contexts.scene.restore();
  }

  clear(cond: true | ContextKeys) {
    const { width, height } = this.option;
    if (cond === true) {
      for (let context in this.contexts) {
        this.contexts[context as ContextKeys].clearRect(0, 0, width, height);
      }
    } else {
      this.contexts[cond].clearRect(0, 0, width, height);
    }
  }
}

export default Renderer;
