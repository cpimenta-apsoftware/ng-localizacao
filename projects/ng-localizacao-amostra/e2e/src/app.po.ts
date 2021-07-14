import { browser, by, element } from 'protractor';

export class AppPage {
  async navegarInicio(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async obterTextoTitulo(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
}
