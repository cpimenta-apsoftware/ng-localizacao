import { CodigoErro } from './codigo-erro';

export class Erro extends Error {
  constructor(private ioCodigo: CodigoErro) {
    super(CodigoErro[ioCodigo]);
    Object.setPrototypeOf(this, Erro.prototype);
  }

  /**
   * Retorna o código de erro
   */
  obterCodigo(): CodigoErro {
    return this.ioCodigo;
  }

}
