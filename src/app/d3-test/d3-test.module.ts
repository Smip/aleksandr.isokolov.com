import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3TestComponent } from './d3-test.component';
import { D3TestRoutingModule } from './d3-test-routing.module';
import { SimpleDivBarsComponent } from './simple-div-bars/simple-div-bars.component';
import { SimpleSvgBarsComponent } from './simple-svg-bars/simple-svg-bars.component';
import { SimpleSvgVertitalBarsComponent } from './simple-svg-vertital-bars/simple-svg-vertital-bars.component';
import { SimpleGeoComponent } from './simple-geo/simple-geo.component';
import { MapService } from '@shared/services/map.service';


@NgModule({
  declarations: [
    D3TestComponent,
    SimpleDivBarsComponent,
    SimpleSvgBarsComponent,
    SimpleSvgVertitalBarsComponent,
    SimpleGeoComponent,
  ],
  imports: [
    CommonModule,
    D3TestRoutingModule,
  ],
  providers: [
    MapService,
  ],
})
export class D3TestModule {
}
