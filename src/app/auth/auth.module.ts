import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutes } from './auth.routing';
import { AuthComponent } from './auth.component';
import { LayoutsModule } from '@shared/layouts/layouts.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutes,
    LayoutsModule,
    TranslateModule
  ]
})
export class AuthModule {
}
