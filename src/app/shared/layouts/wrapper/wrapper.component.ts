import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '@shared/animations/route-animations';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  animations: [
    slider,
  ],
})
export class WrapperComponent {
  prepareRoute(outlet: RouterOutlet) {
    console.log(outlet);
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
