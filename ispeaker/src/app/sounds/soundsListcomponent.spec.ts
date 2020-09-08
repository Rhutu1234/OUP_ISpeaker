import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundListComponent } from './soundList.component';

describe('SoundsComponent', () => {
  let component: SoundListComponent;
  let fixture: ComponentFixture<SoundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
