import {Component} from '@angular/core';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-welcome',
  imports: [
    NzRadioGroupComponent,
    NzRadioComponent,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {
  value = ''
  radioValue = 'A';
  radioValue2 = 'Apple';
  options = [
    { label: 'Пост', value: 'Apple' },
    { label: 'Сторис', value: 'Pear' },
    { label: 'Рассылка', value: 'Orange' }
  ];
}
