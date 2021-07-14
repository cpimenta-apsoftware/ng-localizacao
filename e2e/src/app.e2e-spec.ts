import { AppPage } from './app.po';

describe('Aplicação Angular de acesso às APIs de localização', () => {
  let loPagina: AppPage;

  beforeEach(() => {
    loPagina = new AppPage();
  });

  it('deve exibir a mensagem de bem-vindo', () => {
    loPagina.navegarInicio();
    expect(loPagina.obterTextoParagrafo()).toEqual('Bem-vindo ao ng-localizacao-app!');
  });
});
