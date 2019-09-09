import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocalAnalyzeComponentComponent } from './vocal-analyze-component.component';

describe('VocalAnalyzeComponentComponent', () => {
  let component: VocalAnalyzeComponentComponent;
  let fixture: ComponentFixture<VocalAnalyzeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocalAnalyzeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocalAnalyzeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
