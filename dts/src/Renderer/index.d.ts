import ForceManager from '../forceManager';
import { Setting } from '../setting';
declare type ContextKeys = 'hover' | 'scene';
interface RenderOption {
    width: number;
    height: number;
}
declare class Renderer {
    private manager;
    private setting;
    private option;
    private canvas;
    private zoom;
    private contexts;
    private transfrom;
    private hoveredNode;
    private hoveredTargets;
    private selectedSource;
    constructor(manager: ForceManager, setting: Setting, container: string, option: RenderOption);
    zooming(): void;
    setTransfrom(ctx: CanvasRenderingContext2D): void;
    renderHover(): void;
    render(): void;
    clear(cond: true | ContextKeys): void;
}
export default Renderer;
//# sourceMappingURL=index.d.ts.map