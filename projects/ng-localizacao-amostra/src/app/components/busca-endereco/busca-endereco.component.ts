import { Component, OnInit } from '@angular/core';

import {
  Endereco,
  Erro,
  NgLocalizacaoService,
  CodigoErro,
} from '@apsoftwaresi/ng-localizacao';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../../common/app.constants';

@Component({
  selector: 'app-busca-endereco',
  templateUrl: './busca-endereco.component.html',
  styleUrls: ['./busca-endereco.component.scss'],
})
export class BuscaEnderecoComponent implements OnInit {
  uf = '';
  municipio = '';
  logradouro = '';
  enderecos: Endereco[] = [];
  error = false;
  errorMessage = '';

  constructor(private ioLocalizacaoService: NgLocalizacaoService) { }

  ngOnInit() { }

  public buscarEndereco(): void {
    this.enderecos = [];
    this.error = false;
    this.errorMessage = '';

    this.ioLocalizacaoService
      .buscarPorEndereco(this.uf, this.municipio, this.logradouro, AppConstants.API_MAPBOX_TOKEN)
      .pipe(
        catchError((erro: Erro) => {
          this.error = true;
          this.errorMessage = erro.message;

          switch (erro.obterCodigo()) {
            case CodigoErro.UF_VAZIA:
              this.errorMessage = 'Por favor, informe a UF.';
              break;
            case CodigoErro.UF_TAMANHO_INCORRETO:
              this.errorMessage = 'A UF informada deve ter 2 caracteres.';
              break;
            case CodigoErro.UF_NAO_EXISTE:
              this.errorMessage = `Qual estado tem a sigla "${this.uf}"??`;
              break;

            case CodigoErro.MUNICIPIO_VAZIO:
              this.errorMessage = 'Por favor, informe a cidade.';
              break;
            case CodigoErro.MUNICIPIO_MUITO_CURTO:
              this.errorMessage =
                'Por favor, digite pelo menos três letras da cidade.';
              break;

            case CodigoErro.LOGRADOURO_VAZIO:
              this.errorMessage = 'Por favor, informe o logradouro.';
              break;
            case CodigoErro.LOGRADOURO_MUITO_CURTO:
              this.errorMessage =
                'Por favor, digite pelo menos três letras do logradouro.';
              break;

            default:
              this.errorMessage = 'Erro ao buscar os endereços.';
          }
          return EMPTY;
        })
      )
      .subscribe((enderecos: Array<Endereco>) => {
        this.enderecos = enderecos;
      });
  }
}
