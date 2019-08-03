import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      meta: {
        title: 'Aleksandr Sokolov',
        description: 'Angular developer',
        override: true,
      },
    },
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
