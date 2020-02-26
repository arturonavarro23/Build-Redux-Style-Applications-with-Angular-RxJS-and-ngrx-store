import { createAction, props } from '@ngrx/store';

export const advanceTime = createAction(
  '[People Component] AdvanceTime',
  props<{ person: { name: string, time: Date } }>(),
);

export const recallTimeToPeople = createAction(
  '[People Component] RecallTimeToPeople',
  props<{ time: Date }>(),
);
