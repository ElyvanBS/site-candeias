import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nucleos } from './nucleos';

describe('Nucleos', () => {
  let component: Nucleos;
  let fixture: ComponentFixture<Nucleos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nucleos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nucleos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
