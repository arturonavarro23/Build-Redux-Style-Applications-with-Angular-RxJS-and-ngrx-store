import { Component } from '@angular/core';
import { Subject, Observable, merge, interval } from 'rxjs';
import { mapTo, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store'
import { incrementHour, incrementSeconds } from './state/clock/clock.actions';
import { advanceTime, recallTimeToPeople } from './state/people/people.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  click$ = new Subject();

  recall$ = new Subject();

  person$ = new Subject();

  seconds$ = interval(1000)
    .pipe(mapTo(incrementSeconds({ value: 1 })))

  clock: Observable<Date>;
  people: Observable<{ name: string, time: Date }>;

  constructor(private store: Store<{ clock, people }>) {
    console.log(store);
    this.clock = store.select('clock');
    this.people = store.select('people');

    merge(
      this.click$.pipe(this.incrementHours),
      this.person$.pipe(this.advanceTime),
      this.seconds$,
      this.recall$
        .pipe(withLatestFrom(this.clock, (_, y) => y))
        .pipe(map((time: Date) => recallTimeToPeople({ time }))),
    ).subscribe(action => {
      this.store.dispatch(action);
    });
  }

  incrementHours = map((value: string) => incrementHour({ value: parseInt(value) }));

  advanceTime = map((value: { name: string, time: Date }) => advanceTime({ person: value }));
}

/*************************************
  This is the way to change the value of cloclk without store
  this.clock = merge(
    this.click$.pipe(mapTo('hours')),
    interval(1000).pipe(mapTo('seconds'))
  ).pipe(
    startWith(new Date()),
    scan((acc: Date, curr: string) => {
      const date = new Date(acc.getTime());
      if (curr === 'seconds') {
        date.setSeconds(date.getSeconds() + 1);
      }
      if (curr === 'hours') {
        date.setHours(date.getHours() + 1);
      }
      return date;
    })
  );
*************************************/