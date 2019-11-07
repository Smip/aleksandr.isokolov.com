import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapEditBrowserComponent } from './map-edit-browser.component';
import { SearchBoxDirective } from './search-box.directive';
import { SharedModule } from '@shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MapEditBrowserComponent, SearchBoxDirective],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LeafletModule,
    LeafletDrawModule,
  ],
  exports: [MapEditBrowserComponent],
})
export class MapEditBrowserModule {
}
