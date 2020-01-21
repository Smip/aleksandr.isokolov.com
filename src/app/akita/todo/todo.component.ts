import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../state/todo.model';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo: Todo;
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<ID>();

  constructor() { }

  ngOnInit() {
  }

  markAsCompleted(todo: Todo) {
    this.complete.emit({ ...this.todo, completed: true });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
