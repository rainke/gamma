import { GammaNode, GammaLink, GammaGraph } from './types';
declare type simulationEvent = (this: d3.Simulation<GammaNode, GammaLink>) => void;
export default class ForceManager {
    private simulation;
    private ticks;
    private ends;
    private layouts;
    simulationIsRuning: boolean;
    graph: GammaGraph;
    constructor();
    destory(): void;
    find(x: number, y: number): GammaNode;
    layout: (graph: GammaGraph) => void;
    on(type: 'tick' | 'end' | 'layout', listener: simulationEvent): this;
    off(type: 'tick' | 'end' | 'layout', listener: simulationEvent): this;
}
export {};
//# sourceMappingURL=forceManager.d.ts.map