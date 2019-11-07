import { Component, ElementRef, OnInit } from '@angular/core';
import { D3, NgxD3Service } from '@katze/ngx-d3';

@Component({
  selector: 'app-simple-svg-vertital-bars',
  templateUrl: './simple-svg-vertital-bars.component.html',
  styleUrls: ['./simple-svg-vertital-bars.component.scss'],
})
export class SimpleSvgVertitalBarsComponent implements OnInit {

  private readonly d3: D3 = this.ngxD3Service.getD3();
  private readonly parentNativeElement: HTMLElement;
  private d3svg;

  constructor(element: ElementRef, private readonly ngxD3Service: NgxD3Service) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {

    const width = 900,
      height = 500;

    const data = [30, 86, 168, 281, 303, 365];

    const barWidth = width / data.length;

    const y = this.d3.scaleLinear()
                  .domain([0, this.d3.max(data)])
                  .range([height, 0]);

    const d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3svg = d3ParentElement.select('svg');

    this.d3svg.attr('viewBox', `0 0 ${width} ${height}`)
        .style('width', '100%')
        .style('height', 'auto');

    const bar = this.d3svg.selectAll('g')
                    .data(data)
                    .enter().append('g')
                    .attr('transform', (d, i) => 'translate(' + i * barWidth + ', 0)');

    bar.append('rect')
       .attr('y', (d) => y(d))
       .attr('height', (d) => height - y(d))
       .attr('width', barWidth - 1);

    bar.append('text')
       .attr('y', (d) => y(d) + 3)
       .attr('x', barWidth / 2)
       .attr('dy', '.75em')
       .text(d => d);

  }

}
