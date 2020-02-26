import { createReducer, on } from '@ngrx/store';
import { ActionCreator } from '@ngrx/store';
import { incrementHour, incrementSeconds } from './clock.actions';

export const clockInitialState: Date = new Date;

const _clockReducer = createReducer(clockInitialState,
  on(incrementHour, (state: Date, { value }) => {
    const date = new Date(state.getTime());
    date.setHours(date.getHours() + value);
    return date;
  }),
  on(incrementSeconds, (state: Date, { value }) => {
    const date = new Date(state.getTime());
    date.setSeconds(date.getSeconds() + value);
    return date;
  }),
);

export function clockReducer(state: Date, action: ActionCreator<string>) {
  return _clockReducer(state, action);
}