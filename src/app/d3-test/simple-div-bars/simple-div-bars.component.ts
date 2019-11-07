import { Component, ElementRef, OnInit } from '@angular/core';
import { D3, NgxD3Service } from '@katze/ngx-d3';

@Component({
  selector: 'app-simple-div-bars',
  templateUrl: './simple-div-bars.component.html',
  styleUrls: ['./simple-div-bars.component.scss'],
})
export class SimpleDivBarsComponent implements OnInit {
  private readonly d3: D3 = this.ngxD3Service.getD3();
  private readonly parentNativeElement: HTMLElement;

  constructor(element: ElementRef, private readonly ngxD3Service: NgxD3Service) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    const data = [30, 86, 168, 281, 303, 365];

    const x = this.d3.scaleLinear()
                  .domain([0, this.d3.max(data)])
                  .range([0, 100]);

    const d3ParentElement = this.d3.select(this.parentNativeElement);
    d3ParentElement.select('div')
                   .selectAll('div')
                   .data(data)
                   .enter()
                   .append('div')
                   .style('width', d => x(d) + '%')
                   .text(d => d);
  }

}
