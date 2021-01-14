import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSpeakingDetailsComponent } from './exam-speaking-details.component';

describe('ExamSpeakingDetailsComponent', () => {
  let component: ExamSpeakingDetailsComponent;
  let fixture: ComponentFixture<ExamSpeakingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSpeakingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSpeakingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
