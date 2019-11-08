import { GammaNode, GammaLink, GammaGraph } from './types';
declare const simulation: d3.Simulation<GammaNode, GammaLink>;
declare type simulationEvent = (this: d3.Simulation<GammaNode, GammaLink>) => void;
export declare let simulationIsRuning: boolean;
export declare let graph: GammaGraph;
export declare const initSimulation: () => import("d3-force").Simulation<GammaNode, GammaLink>;
export declare const on: (type: "tick" | "end", listener: simulationEvent) => void;
export declare const off: (type: "tick" | "end", listener: simulationEvent) => void;
export declare const find: (x: number, y: number) => GammaNode;
export declare const getSimulation: () => import("d3-force").Simulation<GammaNode, GammaLink>;
export declare const destory: () => void;
export declare const refresh: (g: GammaGraph) => void;
export default simulation;
//# sourceMappingURL=simulation.d.ts.map