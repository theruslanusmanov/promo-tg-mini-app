import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  list = signal([
    'Заявка 1',
    'Заявка 2',
    'Заявка 3',
  ])

  add() {
    const list = this.list();
    list.push('Заявка ' + (this.list().length + 1))
    this.list.set(list);
  }
}
