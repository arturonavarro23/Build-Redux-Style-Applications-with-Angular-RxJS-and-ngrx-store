import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

// reducers
import { clockReducer } from './state/clock/clock.reducer';
import { peopleReducer } from './state/people/people.reducer';

// components
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      clock: clockReducer,
      people: peopleReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
