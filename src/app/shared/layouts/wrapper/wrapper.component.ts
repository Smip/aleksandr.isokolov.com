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
    // console.log(outlet.isActivated, outlet.activatedRoute);
    // console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    return outlet.isActivated ? outlet.activatedRoute : '';
    // return outlet.activatedRoute ;
    // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
