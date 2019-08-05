import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapEditorRoutingModule } from './map-editor-routing.module';
import { MapEditorComponent } from './map-editor.component';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { MapService } from '@shared/services/map.service';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MapEditorComponent, MapSelectorComponent],
  imports: [
    CommonModule,
    MapEditorRoutingModule,
    SharedModule,
    NgxPaginationModule,
    // !environment.isServer ? [MapEditMockServerModule] : [MapEditModule],
  ],
  providers: [MapService],
})
export class MapEditorModule {
}
