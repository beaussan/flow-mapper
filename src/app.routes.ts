import { Routes } from 'nest-router';
import { AuthModule } from './modules/core/auth/auth.module';
import { AppTechnoModule } from './modules/app-techno/app-techno.module';
import { FlowAppModule } from './modules/flow-app/flow-app.module';
import { FlowTechnoModule } from './modules/flow-techno/flow-techno.module';
import { UserModule } from './modules/user/user.module';

export const appRoutes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/app-technos',
    module: AppTechnoModule,
  },
  {
    path: '/apps',
    module: FlowAppModule,
  },
  {
    path: '/flow-technos',
    module: FlowTechnoModule,
  },
  {
    path: '/users',
    module: UserModule,
  },
];
