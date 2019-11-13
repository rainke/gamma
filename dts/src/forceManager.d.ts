import { GammaNode, GammaLink, GammaGraph } from './types';
declare type simulationEvent = <N>(this: d3.Simulation<N, GammaLink<N>>) => void;
export default class ForceManager<N extends GammaNode> {
    private simulation;
    private ticks;
    private ends;
    private layouts;
    simulationIsRuning: boolean;
    graph: GammaGraph<N>;
    constructor();
    destory(): void;
    find(x: number, y: number): N;
    layout: (graph: GammaGraph<N>) => void;
    on(type: 'tick' | 'end' | 'layout', listener: simulationEvent): this;
    off(type: 'tick' | 'end' | 'layout', listener: simulationEvent): this;
}
export {};
//# sourceMappingURL=forceManager.d.ts.map