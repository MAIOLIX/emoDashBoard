import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTableComponent } from './audio-table.component';

describe('AudioTableComponent', () => {
  let component: AudioTableComponent;
  let fixture: ComponentFixture<AudioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
