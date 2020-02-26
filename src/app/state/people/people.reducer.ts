import { createReducer, on } from '@ngrx/store';
import { advanceTime, recallTimeToPeople } from '../people/people.actions';

type People = {
  name: string;
  time: Date;
}

export const peopleInitialState: People[] = [
  {
    name: 'Arturo',
    time: new Date(),
  },
  {
    name: 'Mary',
    time: new Date(),
  },
  {
    name: 'Rapha',
    time: new Date(),
  }
];

const _peopleReducer = createReducer(
  peopleInitialState,
  on(advanceTime, (state: People[], { person }) => {
    return state.map(p => {
      if (p.name === person.name) {
        const date = new Date(person.time.getTime());
        date.setHours(date.getHours() + 72);
        return {
          ...p,
          time: date
        }
      }
      return p;
    });
  }),
  on(recallTimeToPeople, (state: People[], { time }: { time: Date }) => {
    return state.map(p => ({
      ...p,
      time,
    }));
  }),
);

export function peopleReducer(state: People[], action) {
  return _peopleReducer(state, action);
}