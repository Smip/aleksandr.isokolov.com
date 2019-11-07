import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapEditComponent } from './map-edit.component';
import { MapEditRoutingModule } from './map-edit-routing.module';
import { environment } from '../../../environments/environment';
import { MapEditServerModule } from './map-edit-server/map-edit-server.module';
import { MapEditBrowserModule } from './map-edit-browser/map-edit-browser.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MapEditComponent],
  imports: [
    CommonModule,
    MapEditRoutingModule,
    SharedModule,
    environment.isServer ? [MapEditServerModule] : [MapEditBrowserModule],
  ],
})
export class MapEditModule {
}
