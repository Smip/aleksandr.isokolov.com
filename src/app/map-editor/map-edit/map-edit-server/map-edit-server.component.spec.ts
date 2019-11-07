import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditServerComponent } from './map-edit-server.component';

describe('MapEditServerComponent', () => {
  let component: MapEditServerComponent;
  let fixture: ComponentFixture<MapEditServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapEditServerComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
