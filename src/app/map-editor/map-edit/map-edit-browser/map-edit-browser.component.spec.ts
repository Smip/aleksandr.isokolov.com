import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditBrowserComponent } from './map-edit-browser.component';

describe('MapEditBrowserComponent', () => {
  let component: MapEditBrowserComponent;
  let fixture: ComponentFixture<MapEditBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapEditBrowserComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
