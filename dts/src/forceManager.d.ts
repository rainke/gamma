import { GammaNode, GammaLink, GammaGraph } from './types';
declare type simulationEvent = (this: d3.Simulation<GammaNode, GammaLink>) => void;
export default class ForceManager {
    private simulation;
    private ticks;
    private ends;
    simulationIsRuning: boolean;
    graph: GammaGraph;
    constructor();
    find(x: number, y: number): GammaNode;
    layout: (graph: GammaGraph) => void;
    on(type: 'tick' | 'end', listener: simulationEvent): void;
    off(type: 'tick' | 'end', listener: simulationEvent): void;
}
export {};
//# sourceMappingURL=forceManager.d.ts.map