import { createAction, props } from '@ngrx/store';

export const incrementHour = createAction(
  '[Clock Component] IncrementHour',
  props<{ value: number }>(),
);
export const incrementSeconds = createAction(
  '[Clock Component] IncrementSeconds',
  props<{ value: number }>(),
);
