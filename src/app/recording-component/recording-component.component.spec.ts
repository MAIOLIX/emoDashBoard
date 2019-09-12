import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingComponentComponent } from './recording-component.component';

describe('RecordingComponentComponent', () => {
  let component: RecordingComponentComponent;
  let fixture: ComponentFixture<RecordingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
