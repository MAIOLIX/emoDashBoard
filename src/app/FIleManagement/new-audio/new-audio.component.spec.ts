import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAudioComponent } from './new-audio.component';

describe('NewAudioComponent', () => {
  let component: NewAudioComponent;
  let fixture: ComponentFixture<NewAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
