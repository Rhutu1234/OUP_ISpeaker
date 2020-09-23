import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenAndRecordComponent } from './listen-and-record.component';

describe('ListenAndRecordComponent', () => {
  let component: ListenAndRecordComponent;
  let fixture: ComponentFixture<ListenAndRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenAndRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenAndRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
