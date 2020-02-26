import { Component, Input } from "@angular/core";

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
})
export class ClockComponent {
  @Input()
  time: Date;
}
