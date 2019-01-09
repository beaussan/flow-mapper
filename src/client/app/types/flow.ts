import { App } from './app';
import { FlowTechno } from './flow-technos';

export interface Flow {
  id: number;
  name: string;
  description: string;
  sourceApp: App;
  destinationApp: App;
  flowTechnos: FlowTechno[];
}
