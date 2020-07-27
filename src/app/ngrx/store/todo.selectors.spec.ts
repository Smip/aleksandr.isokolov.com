import * as fromTodo from './todo.reducer';
import { selectTodoState } from './todo.selectors';

describe('Todo Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTodoState({
      [fromTodo.todoFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
