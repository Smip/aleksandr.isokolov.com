import { Component, ElementRef, OnInit } from '@angular/core';
import { D3, NgxD3Service } from '@katze/ngx-d3';

@Component({
  selector: 'app-simple-svg-bars',
  templateUrl: './simple-svg-bars.component.html',
  styleUrls: ['./simple-svg-bars.component.scss'],
})
export class SimpleSvgBarsComponent implements OnInit {
  private readonly d3: D3 = this.ngxD3Service.getD3();
  private readonly parentNativeElement: HTMLElement;
  private d3svg;

  constructor(element: ElementRef, private readonly ngxD3Service: NgxD3Service) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {

    const width = 900;
    const barHeight = 21;

    const data = [30, 86, 168, 281, 303, 365];

    const x = this.d3.scaleLinear()
                  .domain([0, this.d3.max(data)])
                  .range([0, width]);

    const d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3svg = d3ParentElement.select('svg');

    this.d3svg.attr('viewBox', `0 0 ${width} ${(barHeight + 3) * data.length}`)
        .style('width', '100%')
        .style('height', 'auto');

    const bar = this.d3svg.selectAll('g')
                    .data(data)
                    .enter().append('g')
                    .attr('transform', (d, i) => 'translate(0,' + i * barHeight + ')');

    bar.append('rect')
       .attr('width', x)
       .attr('height', barHeight - 2);

    bar.append('text')
       .attr('x', (d) => x(d) - 3)
       .attr('y', barHeight / 2)
       .attr('dy', '.35em')
       .text(d => d);

  }

}
