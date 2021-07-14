import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Amostra da aplicação Angular de acesso às APIs ViaCEP e OpenStreetMap', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('deve mostrar a mensagem de que a aplicação está executando', async () => {
    await page.navegarInicio();
    expect(await page.obterTextoTitulo()).toEqual('aplicação ng-localizacao-amostra está executando!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
