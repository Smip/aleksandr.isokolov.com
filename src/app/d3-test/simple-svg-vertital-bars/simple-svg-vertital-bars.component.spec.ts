import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSvgVertitalBarsComponent } from './simple-svg-vertital-bars.component';

describe('SimpleSvgVertitalBarsComponent', () => {
  let component: SimpleSvgVertitalBarsComponent;
  let fixture: ComponentFixture<SimpleSvgVertitalBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleSvgVertitalBarsComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSvgVertitalBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
