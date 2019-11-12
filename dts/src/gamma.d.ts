import { Settings } from './setting';
import { GammaGraph, Tooltip, Overall } from './types';
interface legendItem {
    name: string;
    color: string;
}
export interface GammaOption {
    graph: GammaGraph;
    container: string;
    graphSettings?: Partial<Settings>;
    forceConfig?: any;
    width?: number;
    height?: number;
    onEnd?: () => void;
    legend?: legendItem[];
    tooltip?: Tooltip;
    overall?: Overall;
}
export default class Gamma {
    private width;
    private height;
    private renderer;
    private manager;
    onEnd: () => void;
    constructor(option?: GammaOption);
    refreshWithGraph(graph: GammaGraph): void;
    destory(): void;
}
export {};
//# sourceMappingURL=gamma.d.ts.map