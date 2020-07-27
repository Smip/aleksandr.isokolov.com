import { RouterModule, Routes } from '@angular/router';
import { NgrxComponent } from './ngrx.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxComponent,
    data: {
      meta: {
        title: 'NgRx State Management',
        description: 'ToDo application build on angular 8 with NgRx State Management',
        override: true,
      },
    },
  },
];

export const NgrxRoutingModule = RouterModule.forChild(routes);


