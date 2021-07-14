import { Erro } from '../model/erro';
import { CodigoErro } from '../model/codigo-erro';
import { UFS_VALIDAS } from '../model/constante';
import { Observable } from 'rxjs';

const lancarErroCep = (error: CodigoErro) => {
  throw new Erro(error);
};

const dadoValido = (data: string | null): boolean => !!data && data.trim() !== '';

const possuiTamanhoCorreto = (
  asDado: string, 
  aiTamanhoMinimo: number, 
  aiTamanhoMaximo: number
): boolean => 
  asDado.trim().length >= aiTamanhoMinimo && (
    asDado.trim().length <= aiTamanhoMaximo || aiTamanhoMaximo == 0);

const validarMunicipio = (municipio: string): void => {
  if (!dadoValido(municipio)) {
    lancarErroCep(CodigoErro.MUNICIPIO_VAZIO);
  }

  if (!possuiTamanhoCorreto(municipio, 3, 0)) {
    lancarErroCep(CodigoErro.MUNICIPIO_MUITO_CURTO);
  }
};

const validarLogradouro = (logradouro: string): void => {
  if (!dadoValido(logradouro)) {
    lancarErroCep(CodigoErro.LOGRADOURO_VAZIO);
  }

  if (!possuiTamanhoCorreto(logradouro, 3, 0)) {
    lancarErroCep(CodigoErro.LOGRADOURO_MUITO_CURTO);
  }
};

const validarUF = (uf: string): void => {
  if (!dadoValido(uf)) {
    lancarErroCep(CodigoErro.UF_VAZIA);
  }

  if (!possuiTamanhoCorreto(uf, 2, 2)) {
    lancarErroCep(CodigoErro.UF_TAMANHO_INCORRETO);
  }  

  if (!UFS_VALIDAS.some((it) => it.toLowerCase() === uf.toLowerCase())) {
    lancarErroCep(CodigoErro.UF_NAO_EXISTE);
  }
};

export const validarCep = () => (
  source: Observable<string | null>
): Observable<string> =>
  new Observable((subscriber) =>
    source.subscribe({
      next: (cep) => {
        try {
          if (!cep) {
            lancarErroCep(CodigoErro.CEP_VAZIO);
          }
          else {
            const regex = new RegExp(/^[0-9]+$/);
            if (!dadoValido(cep)) {
              lancarErroCep(CodigoErro.CEP_VAZIO);
            }
            if (!regex.test(cep)) {
              lancarErroCep(CodigoErro.CEP_INVALIDO);
            }
            if (cep.length < 8) {
              lancarErroCep(CodigoErro.CEP_MUITO_CURTO);
            }
            if (cep.length > 8) {
              lancarErroCep(CodigoErro.CEP_MUITO_LONGO);
            }
            subscriber.next(cep.trim());
          }
        } catch (e) {
          subscriber.error(e);
        }
      },
      error: (error) => subscriber.error(error),
      complete: () => subscriber.complete(),
    })
  );

interface EnderecoPesquisa {
  uf: string;
  logradouro: string;
  cidade: string;
}

export const validarEndereco = () => (
  source: Observable<EnderecoPesquisa>
): Observable<EnderecoPesquisa> =>
  new Observable((subscriber) =>
    source.subscribe({
      next: ({ uf, logradouro, cidade }) => {
        try {
          validarUF(uf);
          validarMunicipio(cidade);
          validarLogradouro(logradouro);
        } catch (e) {
          subscriber.error(e);
        }
        subscriber.next({ uf, logradouro, cidade });
      },
      error: (error) => subscriber.error(error),
      complete: () => subscriber.complete(),
    })
  );
