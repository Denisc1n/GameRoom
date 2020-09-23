import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirPalabrasComponent } from './unir-palabras.component';

describe('UnirPalabrasComponent', () => {
  let component: UnirPalabrasComponent;
  let fixture: ComponentFixture<UnirPalabrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnirPalabrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
