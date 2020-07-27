import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxRoutingModule } from './ngrx-routing.module';
import { NgrxComponent } from './ngrx.component';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effects';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { FilterComponent } from './filter/filter.component';
import { SharedFormsModule } from '@shared/shared-forms/shared-forms.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    NgrxComponent,
    TodosComponent,
    TodoComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    NgrxRoutingModule,
    SharedFormsModule,
    SharedModule,
    EffectsModule.forFeature([TodoEffects]),

  ]
})
export class NgrxModule { }
