import { Component } from '@angular/core';
import { slider } from '@shared/animations/route-animations';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  animations: [
    slider,
  ],
})
export class WrapperComponent {

}
