import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaoEnderecoComponent } from './cartao-endereco/cartao-endereco.component';
import { ListaEnderecoComponent } from './lista-endereco/lista-endereco.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CartaoEnderecoComponent, ListaEnderecoComponent],
  exports: [CartaoEnderecoComponent, ListaEnderecoComponent]
})
export class SharedModule { }
