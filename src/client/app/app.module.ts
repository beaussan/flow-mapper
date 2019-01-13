import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
} from '../@fuse/components/index';

import { fuseConfig } from './fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ApiConfigState } from './state/api-config.state';
import { TokenInterceptor } from './http/token.interceptor';
import { PrefixerInterceptor } from './http/prefixer.interceptor';
import { AuthService } from './services/auth.service';
import { AuthState } from './state/auth.state';
import { ToastrModule } from 'ngx-toastr';
import { ConnectedGuard } from './common/connected.guard';
import { SuperuserGuard } from './common/superuser.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: './main/auth/auth.module#AuthModule',
  },
  {
    path: 'admin',
    loadChildren: './main/admin/admin.module#AdminModule',
    canActivate: [ConnectedGuard, SuperuserGuard],
    canActivateChild: [ConnectedGuard, SuperuserGuard],
  },
  {
    path: '**',
    redirectTo: 'sample',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // NGXS modules
    NgxsModule.forRoot([ApiConfigState, AuthState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: ['auth.authToken'] }),
    NgxsRouterPluginModule.forRoot(),

    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
    }),

    // App modules
    LayoutModule,
    SampleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PrefixerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
