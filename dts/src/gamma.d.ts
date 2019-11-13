import { Settings } from './setting';
import { GammaGraph, Tooltip, Overall, GammaNode } from './types';
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
    legend?: legendItem[];
    tooltip?: Tooltip<N>;
    overall?: Overall<N>;
}
export default class Gamma<N extends GammaNode> {
    private width;
    private height;
    private renderer;
    private manager;
    onEnd: () => void;
    constructor(option?: GammaOption<N>);
    refreshWithGraph(graph: GammaGraph<N>): void;
    destory(): void;
}
export {};
//# sourceMappingURL=gamma.d.ts.map