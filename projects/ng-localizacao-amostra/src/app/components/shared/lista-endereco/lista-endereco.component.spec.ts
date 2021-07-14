import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaEnderecoComponent } from './lista-endereco.component';

describe('ListaEnderecoComponent', () => {
  let component: ListaEnderecoComponent;
  let fixture: ComponentFixture<ListaEnderecoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
