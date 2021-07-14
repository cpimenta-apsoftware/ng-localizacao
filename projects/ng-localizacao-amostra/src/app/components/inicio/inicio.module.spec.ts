import { InicioModule } from './inicio.module';

describe('InicioModule', () => {
  let InicioModule: InicioModule;

  beforeEach(() => {
    InicioModule = new InicioModule();
  });

  it('should create an instance', () => {
    expect(InicioModule).toBeTruthy();
  });
});
