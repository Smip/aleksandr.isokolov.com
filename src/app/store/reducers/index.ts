import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TodosState } from '../../ngrx/store/todo.reducer';

export const stateFeatureKey = 'state';

export interface AppState {
  readonly todos: TodosState;
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
