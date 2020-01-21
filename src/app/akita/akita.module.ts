import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AkitaRoutingModule } from './akita-routing.module';
import { AkitaComponent } from './akita.component';
import { SharedFormsModule } from '@shared/shared-forms/shared-forms.module';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { FilterComponent } from './filter/filter.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [AkitaComponent, TodosComponent, TodoComponent, FilterComponent],
  imports: [
    CommonModule,
    AkitaRoutingModule,
    SharedFormsModule,
    SharedModule
  ],
})
export class AkitaModule { }
