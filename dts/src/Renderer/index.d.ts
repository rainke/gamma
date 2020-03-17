import ForceManager from '../forceManager';
import { GammaNode, legendItem, Tooltip, Overall } from '../types';
import { Setting } from '../setting';
declare type ContextKeys = 'hover' | 'scene';
interface RenderOption<N> {
    width?: number;
    height: number;
    legend?: legendItem[];
    tooltip?: Tooltip<N>;
    overall?: Overall<N>;
}
declare class Renderer<N extends GammaNode> {
    private manager;
    private setting;
    private container;
    private option;
    private canvas;
    private zoom;
    private contexts;
    private transform;
    private hoveredNode;
    private hoveredTargets;
    private width;
    private height;
    private viewFited;
    private tooltip;
    private overall;
    private tooltipFormat;
    private overallFormat;
    constructor(manager: ForceManager<N>, setting: Setting, container: string, option: RenderOption<N>);
    buildOverall(): void;
    buildTooltip(): void;
    resize: () => void;
    handleMouse: () => void;
    zooming(): void;
    setTransfrom(ctx: CanvasRenderingContext2D): void;
    renderHover(): void;
    render(): void;
    renderLegend(): void;
    clear(cond: true | ContextKeys): void;
    destory(): void;
}
export default Renderer;
//# sourceMappingURL=index.d.ts.map