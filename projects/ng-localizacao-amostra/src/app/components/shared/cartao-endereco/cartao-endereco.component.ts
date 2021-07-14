import {Component, Input, OnInit} from '@angular/core';
import {Endereco} from '@apsoftwaresi/ng-localizacao';

@Component({
  selector: 'app-cartao-endereco',
  templateUrl: './cartao-endereco.component.html',
  styleUrls: ['./cartao-endereco.component.scss']
})
export class CartaoEnderecoComponent implements OnInit {

  @Input()
  endereco!: Endereco;

  constructor() { }

  ngOnInit() {
  }
}
