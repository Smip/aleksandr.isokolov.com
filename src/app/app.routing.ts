import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { WrapperComponent } from '@shared/layouts/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    ],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) }],
  },
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
