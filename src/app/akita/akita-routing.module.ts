import { RouterModule, Routes } from '@angular/router';
import { AkitaComponent } from './akita.component';

const routes: Routes = [
  {
    path: '',
    component: AkitaComponent,
    data: {
      meta: {
        title: 'Akita State Management',
        description: 'ToDo application build on angular 8 with Akita State Management',
        override: true,
      },
    },
  },
];

export const AkitaRoutingModule = RouterModule.forChild(routes);
