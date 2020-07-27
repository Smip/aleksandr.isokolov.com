import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ID } from '@datorama/akita';
import { ITodo } from '../models/Todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit, OnChanges {
  @Input() todos: ITodo[];
  @Output() complete = new EventEmitter<ITodo>();
  @Output() delete = new EventEmitter<ID>();

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index, todo) {
    return todo.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
