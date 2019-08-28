import { RouterModule, Routes } from '@angular/router';
import { D3TestComponent } from './d3-test.component';

const routes: Routes = [
  {
    path: '',
    component: D3TestComponent,
  },
];

export const D3TestRoutingModule = RouterModule.forChild(routes);
