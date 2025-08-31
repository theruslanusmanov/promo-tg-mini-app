import {Component} from '@angular/core';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzTimePickerComponent} from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-welcome',
  imports: [
    NzRadioGroupComponent,
    NzRadioComponent,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputDirective,
    NzButtonComponent,
    NzDatePickerComponent,
    NzSpaceItemDirective,
    NzSpaceComponent,
    NzSwitchComponent,
    NzTimePickerComponent
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {
  time = new Date();
  switchValue = false;
  value = ''
  radioValue = 'A';
  radioValue2 = 'Apple';
  options = [
    { label: 'Пост', value: 'Apple' },
    { label: 'Сторис', value: 'Pear' },
    { label: 'Рассылка', value: 'Orange' }
  ];
}
