import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSvgBarsComponent } from './simple-svg-bars.component';

describe('SimpleSvgBarsComponent', () => {
  let component: SimpleSvgBarsComponent;
  let fixture: ComponentFixture<SimpleSvgBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleSvgBarsComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSvgBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
