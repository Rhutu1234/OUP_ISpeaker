import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSpeakingListComponent } from './exam-speaking-list.component';

describe('ExamSpeakingComponent', () => {
  let component: ExamSpeakingListComponent;
  let fixture: ComponentFixture<ExamSpeakingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSpeakingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSpeakingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
