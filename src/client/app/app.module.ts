import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { AppsModule } from './main/apps/apps.module';
import { FlowsModule } from './main/flows/flows.module';
import { FlowTechnosState } from './state/flow-technos.state';
import { FlowState } from './state/flow.state';
import { AppTechnosState } from './state/app-technos.state';
import { AppState } from './state/app.state';
import { GraphModule } from './main/graph/graph.module';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { CreateTechnoDialogComponent } from './dialogs/create-techno-dialog/create-techno-dialog.component';
import { CreateFlowDialogComponent } from './dialogs/create-flow-dialog/create-flow-dialog.component';
import { CreateAppDialogComponent } from './dialogs/create-app-dialog/create-app-dialog.component';

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
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    CreateTechnoDialogComponent,
    CreateFlowDialogComponent,
    CreateAppDialogComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
    CreateTechnoDialogComponent,
    CreateFlowDialogComponent,
    CreateAppDialogComponent,
  ],
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatAutocompleteModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // NGXS modules
    NgxsModule.forRoot([
      ApiConfigState,
      AuthState,
      FlowTechnosState,
      AppState,
      AppTechnosState,
      FlowState,
    ]),
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
    AppsModule,
    FlowsModule,
    GraphModule,
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
