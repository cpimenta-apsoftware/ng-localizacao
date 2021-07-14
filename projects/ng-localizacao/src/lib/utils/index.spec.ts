import { EMPTY, of, throwError } from 'rxjs';
import { validarCep } from './index';
import { catchError } from 'rxjs/operators';
import { Erro } from '../model/erro';

describe('Testar métodos úteis', () => {
  describe('validarCEP', () => {
    it('Dado um CEP nulo deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = null;

      of(cep)
        .pipe(
          validarCep(),
          catchError((e) => {
            expect(e).toBeInstanceOf(Erro);
            done();
            return EMPTY;
        })
        )
        .subscribe();
    });

    it('Dado um CEP vazio deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = '';

      of(cep)
        .pipe(
          validarCep(),
          catchError((e) => {
            expect(e).toBeInstanceOf(Erro);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('Dado um CEP com menos de 8 caracteres deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = '1234567';

      of(cep)
        .pipe(
          validarCep(),
          catchError((e) => {
            expect(e).toBeInstanceOf(Erro);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('Dado um CEP com mais de 8 caracteres deve retornar o erro CEP_INVALIDO', (done) => {
      const cep = '123456789';

      of(cep)
        .pipe(
          validarCep(),
          catchError((e) => {
            expect(e).toBeInstanceOf(Erro);
            done();
            return EMPTY;
          })
        )
        .subscribe();
    });

    it('Dado um CEP válido deve retornar o CEP', (done) => {
      const cep = '12345678';

      of(cep)
        .pipe(
          validarCep()
        )
        .subscribe(result => {
          expect(result).toEqual(cep);
          done();
        });
    });
  });
});
