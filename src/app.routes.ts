import { Routes } from 'nest-router';
import { AuthModule } from './modules/core/auth/auth.module';
import { AppTechnoModule } from './modules/app-techno/app-techno.module';
import { FlowAppModule } from './modules/flow-app/flow-app.module';

export const appRoutes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/app-appTechnos',
    module: AppTechnoModule,
  },
  {
    path: '/apps',
    module: FlowAppModule,
  },
];
