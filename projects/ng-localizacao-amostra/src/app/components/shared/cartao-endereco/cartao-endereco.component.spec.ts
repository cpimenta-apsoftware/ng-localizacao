import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartaoEnderecoComponent } from './cartao-endereco.component';

describe('CartaoEnderecoComponent', () => {
  let component: CartaoEnderecoComponent;
  let fixture: ComponentFixture<CartaoEnderecoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
