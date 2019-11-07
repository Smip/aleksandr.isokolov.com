import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDivBarsComponent } from './simple-div-bars.component';

describe('SimpleDivBarsComponent', () => {
  let component: SimpleDivBarsComponent;
  let fixture: ComponentFixture<SimpleDivBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleDivBarsComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDivBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
