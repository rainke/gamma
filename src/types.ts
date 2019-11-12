import * as d3 from 'd3';

export interface GammaNode extends d3.SimulationNodeDatum {
  name: string;
  id: string;
  size?: number;
  color?: string;
  label?: string;
  linkColor?: string;
}

export type GammaLink = d3.SimulationLinkDatum<GammaNode>;

export interface Tooltip {
  format?(node: GammaNode): string
}

export interface Overall {
  format?(g: GammaGraph): string
}

export interface GammaGraph {
  nodes: GammaNode[],
  links: GammaLink[]
}

export interface legendItem {
  name: string;
  color: string;
}

