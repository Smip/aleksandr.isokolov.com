import { NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';

import { LayoutsModule } from './layouts/layouts.module';
import { NgxMaterialize } from '@smip/ngx-materialize';
import { MomentPipe } from '@shared/pipes/moment.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MomentPipe],
  imports: [],
  exports: [
    LayoutsModule,
    TransferHttpModule,
    ReactiveFormsModule,
    NgxMaterialize,
    MomentPipe,
  ],
  providers: [],
})
export class SharedModule {
}
