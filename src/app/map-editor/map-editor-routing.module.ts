import { RouterModule, Routes } from '@angular/router';
import { MapEditorComponent } from './map-editor.component';
import { MapSelectorComponent } from './map-selector/map-selector.component';

const routes: Routes = [
  {
    path: '',
    component: MapEditorComponent,
    children: [
      {
        path: '',
        component: MapSelectorComponent,
        data: {
          meta: {
            title: 'Map editor based on leaflet & angular',
            description: 'Example of map editor made in angular 8',
            override: true,
          },
        },
      },
      {
        path: ':slug',
        loadChildren: () => import('./map-edit/map-edit.module').then(m => m.MapEditModule),
        // component: MapEditComponent,
        data: {
          meta: {
            title: 'Map editor based on leaflet & angular',
            description: 'Example of map editor made in angular 8',
            override: true,
          },
        },
      },
    ],
  },
];

export const MapEditorRoutingModule = RouterModule.forChild(routes);
