import { forceSimulation, forceManyBody, forceLink, forceCenter, forceX, forceY, forceCollide } from 'd3';
import { GammaNode, GammaLink, GammaGraph } from './types';

type simulationEvent = (this: d3.Simulation<GammaNode, GammaLink>) => void;

export default class ForceManager {
  private simulation: d3.Simulation<GammaNode, GammaLink> = forceSimulation();
  private ticks = new Set<simulationEvent>();
  private ends = new Set<simulationEvent>();
  private layouts = new Set<simulationEvent>();
  simulationIsRuning = false;
  graph = { nodes: [], links: [] } as GammaGraph;
  constructor() {
    this.simulation
      .force(
        'charge',
        forceManyBody()
          .theta(0.5)
          .distanceMax(1000)
          .strength(-100)
      )
      .force(
        'link',
        forceLink<GammaNode, any>()
          .id(link => link.id)
          .iterations(10)
          .distance(40)
          .strength(0.5)
      )
      .force('center', forceCenter())
      .force('collide', forceCollide(6))
      .force('x', forceX().strength(0.1))
      .force('y', forceY().strength(0.1))
      .on('tick', () => {
        this.ticks.forEach(tick => tick.call(this));
      })
      .on('end', () => {
        this.simulationIsRuning = false;
        this.ends.forEach(end => end.call(this));
      });
  }

  destory() {
    this.simulation.on('tick', null).on('end', null);
  }

  find(x: number, y: number) {
    return this.simulation.find(x, y);
  }

  layout = (graph: GammaGraph) => {
    this.simulationIsRuning = true;
    this.graph = graph;
    (this.simulation
      .nodes(graph.nodes)
      .alpha(1)
      .alphaTarget(0)
      .restart()
      .force('link') as d3.ForceLink<GammaNode, GammaLink>).links(graph.links);
    this.layouts.forEach(fn => fn.call(this));
  };

  on(type: 'tick' | 'end' | 'layout', listener: simulationEvent) {
    if (type === 'tick') {
      this.ticks.add(listener);
    } else if (type === 'end') {
      this.ends.add(listener);
    } else if (type === 'layout') {
      this.layouts.add(listener);
    }

    return this;
  }

  off(type: 'tick' | 'end' | 'layout', listener: simulationEvent) {
    if (type === 'tick') {
      this.ticks.delete(listener);
    } else if (type === 'end') {
      this.ends.delete(listener);
    } else if (type === 'layout') {
      this.layouts.delete(listener);
    }
    return this;
  }
}
