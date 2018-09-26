import { Routes } from 'nest-router';
import { AuthModule } from './modules/core/auth/auth.module';
import { AppTechnoModule } from './modules/app-techno/app-techno.module';

export const appRoutes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/app-techno',
    module: AppTechnoModule,
  },
];
