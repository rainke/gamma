import { select } from 'd3';
import Renderer from './Renderer';
import setSetings, { Settings } from './setting';
import forceManager from './forceManager';
import { GammaGraph, Tooltip, Overall, GammaNode, GammaLink } from './types';

interface legendItem {
  name: string;
  color: string;
}

export interface GammaOption<N extends GammaNode> {
  graph: GammaGraph<N>;
  container: string;
  graphSettings?: Partial<Settings>;
  forceConfig?: any;
  width?: number;
  height?: number;
  onEnd?: () => void;
  legend?: legendItem[],
  tooltip?: Tooltip<N>;
  overall?: Overall<N>
}
export default class Gamma<N extends GammaNode> {
  private width: number;
  private height = 800;
  private renderer: Renderer<N>;
  private manager = new forceManager<N>();
  onEnd = function() {};
  constructor(option?: GammaOption<N>) {
    if (!option.container) {
      console.log('no container');
    }

    if(option.height) {
      this.height = option.height;
    }

    if (option.onEnd) {
      this.onEnd = option.onEnd;
    }

    select(option.container)
      .selectAll('*')
      .remove();

      
      this.renderer = new Renderer(this.manager, setSetings(option.graphSettings), option.container, {
        width: this.width,
        height: this.height,
        legend: option.legend,
        tooltip: option.tooltip,
        overall: option.overall
      });

      this.manager.layout(option.graph);
  }

  refreshWithGraph(graph: GammaGraph<N>) {
    this.manager.layout(graph);
  }

  destory() {
    this.renderer.destory();
    this.manager.destory();
  }
}
