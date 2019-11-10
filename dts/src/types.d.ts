import * as d3 from 'd3';
export interface GammaNode extends d3.SimulationNodeDatum {
    name: string;
    id: string;
    size?: number;
    color?: string;
    label?: string;
    linkColor?: string;
}
export declare type GammaLink = d3.SimulationLinkDatum<GammaNode>;
export interface GammaGraph {
    nodes: GammaNode[];
    links: GammaLink[];
}
//# sourceMappingURL=types.d.ts.map