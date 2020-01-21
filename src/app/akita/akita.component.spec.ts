import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkitaComponent } from './akita.component';

describe('AkitaComponent', () => {
  let component: AkitaComponent;
  let fixture: ComponentFixture<AkitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
