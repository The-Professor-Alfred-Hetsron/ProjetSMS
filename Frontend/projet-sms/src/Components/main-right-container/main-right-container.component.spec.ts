import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRightContainerComponent } from './main-right-container.component';

describe('MainRightContainerComponent', () => {
  let component: MainRightContainerComponent;
  let fixture: ComponentFixture<MainRightContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRightContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRightContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
