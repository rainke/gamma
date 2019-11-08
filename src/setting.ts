import {GammaNode} from './types';

export type Setting = <T extends keyof Settings>(name: T) => Settings[T];

export interface Settings {
  nodeSize: number;
  nodeColor: string;
  hoverNodeColor: string;
  hoverLabelColor: string;
  hoverLabel: keyof GammaNode;
}

function factory(s: Partial<Settings>){
  const settings: Settings = {
    nodeSize: 3,
    nodeColor: 'green',
    hoverNodeColor: 'green',
    hoverLabelColor: '#333',
    hoverLabel: 'label'
  }

  Object.assign(settings, s);

  return function setting<T extends keyof Settings>(name: T): Settings[T] {
    return settings[name]
  }

}

export default factory;
