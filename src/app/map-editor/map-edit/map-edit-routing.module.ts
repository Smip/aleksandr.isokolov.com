import { RouterModule, Routes } from '@angular/router';
import { MapEditComponent } from './map-edit.component';


const routes: Routes = [
  {
    path: '',
    component: MapEditComponent,
  },
];

export const MapEditRoutingModule = RouterModule.forChild(routes);
