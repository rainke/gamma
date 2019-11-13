import * as d3 from 'd3';

export interface GammaNode extends d3.SimulationNodeDatum {
  name: string;
  id: string;
  size?: number;
  color?: string;
  label?: string;
  linkColor?: string;
}

export type GammaLink<T> = d3.SimulationLinkDatum<T>;

export interface Tooltip<N> {
  format?(node: N): string
}

export interface Overall<N> {
  format?(g: GammaGraph<N>): string
}

export interface GammaGraph<N> {
  nodes: N[],
  links: GammaLink<N>[]
}

export interface legendItem {
  name: string;
  color: string;
}

