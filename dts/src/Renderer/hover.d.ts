import { GammaNode } from '../types';
import { Setting } from '../setting';
interface RenderHoverConfig {
    label?: boolean;
}
declare const renderHover: (node: GammaNode, context: CanvasRenderingContext2D, transform: import("d3-zoom").ZoomTransform, setting: Setting, RenderHoverConfig?: RenderHoverConfig) => void;
export default renderHover;
//# sourceMappingURL=hover.d.ts.map