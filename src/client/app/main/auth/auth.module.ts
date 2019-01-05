import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, RegisterModule],
})
export class AuthModule {}
