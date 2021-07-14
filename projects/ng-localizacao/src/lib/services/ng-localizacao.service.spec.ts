import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgLocalizacaoService } from './ng-localizacao.service';
import { Endereco } from '../model/endereco';
import { URL_VIACEP } from '../model/constante';
import { Erro } from '../model/erro';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

describe('NgLocalizacaoService', () => {
  let loServico: NgLocalizacaoService;
  let loTeste: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NgLocalizacaoService],
    });

    loServico = TestBed.inject(NgLocalizacaoService);
    loTeste = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    loTeste.verify();
  });

  it('deve ser criado', () => {
    expect(loServico).toBeTruthy();
  });

  describe('buscarPorCep', () => {
    it('dado um CEP nulo deve retornar o erro CEP_VAZIO', (done) => {
      loServico
        .buscarPorCep(null)
        .pipe(
          catchError((erro: Error) => {
            expect(erro).toBeInstanceOf(Erro);
            expect(erro.message).toEqual('CEP_VAZIO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP vazio deve retornar o erro CEP_VAZIO', (done) => {
      loServico
        .buscarPorCep('')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_VAZIO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com espaços deve retornar o erro CEP_VAZIO', (done) => {
      loServico
        .buscarPorCep('       ')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_VAZIO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com letra deve retornar o erro CEP_INVALIDO', (done) => {
      loServico
        .buscarPorCep('X')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_INVALIDO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com menos de 8 números deve retornar o erro CEP_MUITO_CURTO', (done) => {
      loServico
        .buscarPorCep('1234567')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_MUITO_CURTO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP com mais de 8 números deve retornar o erro CEP_MUITO_LONGO', (done) => {
      loServico
        .buscarPorCep('123456789')
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_MUITO_LONGO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um CEP válido deve retornar um endereco', (done) => {
      const cep = '59144333';
      const enderecoResponse: Endereco = {
        cep,
        logradouro: 'string',
        complemento: 'string',
        bairro: 'string',
        cidade: 'string',
        uf: 'BA',        
        codigoIbge: 'string',
        gia: 'string',
      };

      loServico.buscarPorCep(cep).subscribe((endereco) => {
        expect(endereco.cep).toEqual(cep);
        expect(endereco).toEqual(enderecoResponse);
        done();
      });

      const req = loTeste.expectOne(`${URL_VIACEP}/${cep}/json`);
      req.flush(enderecoResponse);
    });

    it('dado um CEP válido, mas não encontrado, deve retornar o erro CEP_NAO_ENCONTRADO', (done) => {
      const cep = '59144333';
      const enderecoResponse = {};

      loServico
        .buscarPorCep(cep)
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('CEP_NAO_ENCONTRADO');
            done();
            return EMPTY;
          })
        )
        .subscribe();

      const req = loTeste.expectOne(`${URL_VIACEP}/${cep}/json`);
      req.flush(enderecoResponse);
    });
  });

  describe('buscarPorEndereco', () => {
    it('dado um endereco com ufSigla vazia deve retornar o erro UF_VAZIA', (done) => {
      const ufSigla = '';
      const municipio = 'Salvador';
      const logradouro = 'Alameda Salvador';

      loServico
        .buscarPorEndereco(ufSigla, municipio, logradouro)
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('UF_VAZIA');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um endereco com municipio vazia deve retornar o erro MUNICIPIO_VAZIO', (done) => {
      const ufSigla = 'BA';
      const municipio = '';
      const logradouro = 'Alameda Salvador';

      loServico
        .buscarPorEndereco(ufSigla, municipio, logradouro)
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('MUNICIPIO_VAZIO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um endereco com logradouro vazia deve retornar o erro LOGRADOURO_VAZIO', (done) => {
      const ufSigla = 'BA';
      const municipio = 'ABC';
      const logradouro = '';

      loServico
        .buscarPorEndereco(ufSigla, municipio, logradouro)
        .pipe(
          catchError((erro: Error) => {
            expect(erro.message).toEqual('LOGRADOURO_VAZIO');
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('dado um endereco válido deve retornar a mensagem com o endereço correto', (done) => {
      const uf = 'BA';
      const municipio = 'ABC';
      const logradouro = 'ASDFGHJKL';

      const enderecoResponse: Endereco = {
        cep: 'string',
        logradouro,
        complemento: 'string',
        bairro: 'string',
        cidade: 'string',
        uf,        
        codigoIbge: 'string',
        gia: 'string',
      };

      loServico
        .buscarPorEndereco(uf, municipio, logradouro)
        .subscribe((enderecos) => {
          const found = enderecos.some((e) => e.logradouro === logradouro);
          expect(found).toBeTrue();
          done();
        });

      const req = loTeste.expectOne(
        `${URL_VIACEP}/${uf}/${municipio}/${logradouro}/json`
      );
      req.flush([enderecoResponse]);
    });
  });
});
