import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { D3, NgxD3Service } from '@katze/ngx-d3';
import { MapService } from '@shared/services/map.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-simple-geo',
  templateUrl: './simple-geo.component.html',
  styleUrls: ['./simple-geo.component.scss'],
})
export class SimpleGeoComponent implements OnInit, OnDestroy {

  private readonly d3: D3 = this.ngxD3Service.getD3();
  private readonly parentNativeElement: HTMLElement;
  private d3svg;

  constructor(
    element: ElementRef,
    private readonly ngxD3Service: NgxD3Service,
    private _map: MapService) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    const width = 900;
    const height = 450;
    // const width = map.node().getBoundingClientRect().width;
    // const height = width / 2;
    const d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3svg = d3ParentElement.select('svg');
    this.d3svg.attr('viewBox', `0 0 ${width} ${height}`)
        .style('width', '100%')
        .style('height', 'auto');

    this._map.getMap('vienna-1564936894').pipe(
      untilDestroyed(this),
    ).subscribe(response => {
      const projection = this.d3.geoMercator()
                             .scale(response.map.zoom * 8000)
                             .center([response.map.center.lng, response.map.center.lat]);

      const path = this.d3.geoPath().projection(projection);
      this.d3svg.selectAll('path')
          .data(response.map.features.map(area => area.feature))
          .enter().append('path')
          .attr('d', path)
          .attr('fill', '#ff0000')
          .attr('stroke', '#000000');

    });
  }

  ngOnDestroy(): void {
  }

}
