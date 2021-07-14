import {
  bool,
  cleanEnv, email, EnvError, EnvMissingError, json, makeValidator, str, testOnly,
} from 'envalid';
import { environment } from '../environments/environment';

export const environmentVariables = cleanEnv(environment,
  {
    apiMapboxToken: str({ desc: 'Token de acesso à API do Mapbox' }),
    environmentName: str({
      choices: ['development', 'production', 'staging'],
      default: 'development',
      desc: 'Ambiente de execução da aplicação'
    }),
    production: bool({ default: false, desc: 'Define se é ambiente de produção' }),
  },
  {
    reporter: ({ errors, env }) => {
      if (Object.keys(errors).length > 0) {
        console.log('Variáveis de ambiente inválidas: ' + Object.keys(errors));
        Object.values(errors).forEach(err => {
          if (err instanceof EnvError) {
            console.log('EnvError: ' + err.message);
          } else if (err instanceof EnvMissingError) {
            console.log('EnvMissingError: ' + err.message);
          } else if (err instanceof TypeError) {
            console.log('TypeError: ' + err.message);
          } else {
            console.log('Outros: ' + err);
          }
        });
      }
    }
  }
);

export type EnvironmentVariables = typeof environmentVariables;