import { AppTechno } from './app-technos';

export interface App {
  id: number;
  name: string;
  description: string;
  technos: AppTechno[];
}
