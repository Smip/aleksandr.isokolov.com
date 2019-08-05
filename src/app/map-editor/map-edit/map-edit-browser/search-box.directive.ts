import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Control, DomEvent, DomUtil } from 'leaflet';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
import { fromEvent, merge } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';
import 'shim-keyboard-event-key';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[searchBox]',
})
export class SearchBoxDirective implements OnInit, OnChanges, OnDestroy {
  leafletDirective: LeafletDirectiveWrapper;
  @Input() searchString: string;
  @Output() search = new EventEmitter<string>();
  inputField: HTMLInputElement;
  // searchResultUl: HTMLUListElement;
  searchBoxControl: Control;

  constructor(
    leafletDirective: LeafletDirective,
    private renderer: Renderer2,
  ) {
    this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
  }

  ngOnInit() {
    this.leafletDirective.init();
    const map = this.leafletDirective.getMap();
    this.searchBoxControl = new Control({ position: 'topleft' });
    this.searchBoxControl.onAdd = () => {
      const container = DomUtil.create('div', 'search-container');
      const searchInputContainer = this.renderer.createElement('div');
      this.renderer.addClass(searchInputContainer, 'search-input-container');
      this.inputField = this.renderer.createElement('input');
      this.renderer.setAttribute(this.inputField, 'type', 'text');
      this.renderer.setAttribute(this.inputField, 'placeholder', 'Search areas on wikimapia...');
      this.renderer.setAttribute(this.inputField, 'value', this.searchString);
      this.renderer.appendChild(searchInputContainer, this.inputField);
      this.renderer.appendChild(container, searchInputContainer);
      const btn = this.renderer.createElement('button');
      this.renderer.addClass(btn, 'btn-flat');
      this.renderer.addClass(btn, 'waves-effect');
      this.renderer.setAttribute(btn, 'title', 'Нажмите чтобы найти');

      const icon = this.renderer.createElement('i');
      this.renderer.addClass(icon, 'material-icons');
      this.renderer.appendChild(icon, this.renderer.createText('search'));
      this.renderer.appendChild(btn, icon);
      this.renderer.appendChild(searchInputContainer, btn);


      fromEvent(this.inputField, 'input')
        .pipe(
          pluck('target', 'value'),
          untilDestroyed(this),
        )
        .subscribe((value: string) => (this.searchString = value));

      merge(
        fromEvent(this.inputField, 'keyup')
          .pipe(filter((e: KeyboardEvent) => (e.key === 'Enter'))),
        fromEvent(btn, 'click'),
      )
        .pipe(untilDestroyed(this))
        .subscribe(res => this.search.emit(this.searchString));


      DomEvent.disableClickPropagation(container);
      /* Prevent right click event propagation to map */
      DomEvent.on(container, 'contextmenu', function(ev) {
        DomEvent.stopPropagation(ev);
      });
      /* Prevent scroll events propagation to map when cursor on the div */
      DomEvent.disableScrollPropagation(container);
      return container;
    };
    this.searchBoxControl.addTo(map);
  }

  ngOnDestroy() {
    this.leafletDirective.getMap().removeControl(this.searchBoxControl);
  }

  ngOnChanges() {
    if (this.inputField) {
      this.renderer.setProperty(this.inputField, 'value', this.searchString);
    }
  }
}
