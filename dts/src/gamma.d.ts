import { Settings } from './setting';
import { GammaGraph } from './types';
interface legendItem {
    name: string;
    color: string;
}
export interface GammaOption {
    graph: GammaGraph;
    container: string;
    graphSettings?: Partial<Settings>;
    forceConfig?: any;
    onEnd?: () => void;
    legend?: legendItem[];
}
export default class Gamma {
    private width;
    private height;
    private renderer;
    private manager;
    onEnd: () => void;
    constructor(option?: GammaOption);
    refreshWithGraph(graph: GammaGraph): void;
}
export {};
//# sourceMappingURL=gamma.d.ts.map