import { Component, OnInit } from '@angular/core';

import {
  Endereco,
  Erro,
  CodigoErro,
  NgLocalizacaoService,
} from '@apsoftwaresi/ng-localizacao';

import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../../common/app.constants';

@Component({
  selector: 'app-busca-cep',
  templateUrl: './busca-cep.component.html',
  styleUrls: ['./busca-cep.component.scss'],
})
export class BuscaCepComponent implements OnInit {
  cep = '';
  endereco?: Endereco | null;
  error = false;
  errorMessage = '';

  constructor(private ioLocalizacaoService: NgLocalizacaoService) {}

  ngOnInit() {}

  public buscarCep(): void {
    this.endereco = null;
    this.error = false;
    this.errorMessage = '';

    this.ioLocalizacaoService
      .buscarPorCep(this.cep, AppConstants.API_MAPBOX_TOKEN)
      .pipe(
        catchError((erro: Erro) => {
          this.error = true;

          switch (erro.obterCodigo()) {
            case CodigoErro.CEP_VAZIO:
              this.errorMessage = 'Por favor, informe o CEP.';
              break;
            case CodigoErro.CEP_INVALIDO:
              this.errorMessage = `O CEP "${this.cep}" não é válido.`;
              break;
            case CodigoErro.CEP_MUITO_CURTO:
              this.errorMessage = 'O CEP informado é curto demais.';
              break;
            case CodigoErro.CEP_MUITO_LONGO:
              this.errorMessage = 'O CEP informado é longo demais.';
              break;
            case CodigoErro.CEP_NAO_ENCONTRADO:
              this.errorMessage = `O CEP "${this.cep}" não foi encontrado.`;
              break;
            default:
              this.errorMessage = 'Erro ao buscar o CEP.';
          }

          return EMPTY;
        })
      )
      .subscribe((endereco: Endereco) => {
        this.endereco = endereco;
      });
  }
}
