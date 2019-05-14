import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';

import { LayoutsModule } from './layouts/layouts.module';
import { SharedMetaModule } from './shared-meta';
import { NgxMaterialize } from '@smip/ngx-materialize';

@NgModule({
  // imports: [NgxMaterialize],
  exports: [LayoutsModule, SharedMetaModule, TransferHttpModule, NgxMaterialize],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
