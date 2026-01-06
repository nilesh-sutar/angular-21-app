import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular21demo');

  counter = signal(0);

  onButtonClick(action: "inc" | 'dec') {
    if (action === 'inc') {
      this.counter.update(val => val + 1)
    } else {
      this.counter.update(val => val - 1)
    }
  }
}
