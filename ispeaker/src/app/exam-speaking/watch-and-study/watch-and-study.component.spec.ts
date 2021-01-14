import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchAndStudyComponent } from './watch-and-study.component';

describe('WatchAndStudyComponent', () => {
  let component: WatchAndStudyComponent;
  let fixture: ComponentFixture<WatchAndStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchAndStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchAndStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
