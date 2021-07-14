import {Component, Input, OnInit} from '@angular/core';
import {Endereco} from '@apsoftwaresi/ng-localizacao';

@Component({
  selector: 'app-lista-endereco',
  templateUrl: './lista-endereco.component.html',
  styleUrls: ['./lista-endereco.component.scss']
})
export class ListaEnderecoComponent implements OnInit {

  @Input()
  enderecos!: Endereco[];

  constructor() { }

  ngOnInit() {
  }

}
