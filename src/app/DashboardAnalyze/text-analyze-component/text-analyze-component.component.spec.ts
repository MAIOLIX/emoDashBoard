import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzeComponentComponent } from './text-analyze-component.component';

describe('TextAnalyzeComponentComponent', () => {
  let component: TextAnalyzeComponentComponent;
  let fixture: ComponentFixture<TextAnalyzeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAnalyzeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAnalyzeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
