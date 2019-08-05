import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapEditorRoutingModule } from './map-editor-routing.module';
import { MapEditorComponent } from './map-editor.component';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { MapEditComponent } from './map-edit/map-edit.component';
import { MapService } from '@shared/services/map.service';
import { SharedModule } from '@shared/shared.module';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SearchBoxDirective } from './map-edit/search-box.directive';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MapEditorComponent, MapSelectorComponent, MapEditComponent, SearchBoxDirective],
  imports: [
    CommonModule,
    MapEditorRoutingModule,
    SharedModule,
    NgxPaginationModule,
    LeafletModule,
    LeafletDrawModule,
  ],
  providers: [MapService],
})
export class MapEditorModule {
}
