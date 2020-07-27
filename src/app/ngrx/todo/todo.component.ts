import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ID } from '@datorama/akita';
import { ITodo } from '../models/Todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo: ITodo;
  @Output() complete = new EventEmitter<ITodo>();
  @Output() delete = new EventEmitter<ID>();

  constructor() { }

  ngOnInit() {
  }

  markAsCompleted(todo: ITodo) {
    this.complete.emit({ ...this.todo, completed: true });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
