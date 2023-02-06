import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsPageComponent } from './send-sms-page.component';

describe('SendSmsPageComponent', () => {
  let component: SendSmsPageComponent;
  let fixture: ComponentFixture<SendSmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSmsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
