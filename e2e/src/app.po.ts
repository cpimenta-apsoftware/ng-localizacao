import { browser, by, element } from 'protractor';

export class AppPage {
  navegarInicio() {
    return browser.get('/');
  }

  obterTextoParagrafo() {
    return element(by.css('app-root h1')).getText();
  }
}
