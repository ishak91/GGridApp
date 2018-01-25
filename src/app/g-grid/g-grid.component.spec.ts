import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GGridComponent } from './g-grid.component';

describe('GGridComponent', () => {
  let component: GGridComponent;
  let fixture: ComponentFixture<GGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
