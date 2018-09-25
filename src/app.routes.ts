import { Routes } from 'nest-router';
import { AuthModule } from './modules/core/auth/auth.module';

export const appRoutes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
];
