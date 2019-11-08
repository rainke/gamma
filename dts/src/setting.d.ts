import { GammaNode } from './types';
export declare type Setting = <T extends keyof Settings>(name: T) => Settings[T];
export interface Settings {
    nodeSize: number;
    nodeColor: string;
    hoverNodeColor: string;
    hoverLabelColor: string;
    hoverLabel: keyof GammaNode;
}
declare function factory(s: Partial<Settings>): <T extends "nodeSize" | "nodeColor" | "hoverNodeColor" | "hoverLabelColor" | "hoverLabel">(name: T) => Settings[T];
export default factory;
//# sourceMappingURL=setting.d.ts.map