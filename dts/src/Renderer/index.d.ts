import ForceManager from '../forceManager';
import { legendItem, Tooltip, Overall } from '../types';
import { Setting } from '../setting';
declare type ContextKeys = 'hover' | 'scene';
interface RenderOption {
    width?: number;
    height: number;
    legend?: legendItem[];
    tooltip?: Tooltip;
    overall?: Overall;
}
declare class Renderer {
    private manager;
    private setting;
    private container;
    private option;
    private canvas;
    private zoom;
    private contexts;
    private transfrom;
    private hoveredNode;
    private hoveredTargets;
    private width;
    private tooltip;
    private overall;
    private tooltipFormat;
    private overallFormat;
    constructor(manager: ForceManager, setting: Setting, container: string, option: RenderOption);
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