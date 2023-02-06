import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveContactsPageComponent } from './save-contacts-page.component';

describe('SaveContactsPageComponent', () => {
  let component: SaveContactsPageComponent;
  let fixture: ComponentFixture<SaveContactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveContactsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
