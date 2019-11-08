import { Settings } from './setting';
import { GammaGraph } from './types';
export interface GammaOption {
    graph: GammaGraph;
    container: string;
    graphSettings?: Partial<Settings>;
    forceConfig?: any;
    onEnd?: () => void;
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
//# sourceMappingURL=gamma.d.ts.map