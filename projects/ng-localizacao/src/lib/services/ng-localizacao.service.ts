import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Endereco } from '../model/endereco';
import { CodigoErro } from '../model/codigo-erro';
import { Erro } from '../model/erro';
import {
  URL_GOOGLE_MAPS_SEARCH,
  URL_IBGE,
  URL_MAPBOX,
  URL_VIACEP
} from '../model/constante';
import {
  validarCep,
  validarEndereco,
} from '../utils';
import { finalize, map, switchMap } from 'rxjs/operators';

export interface EnderecoViaCep {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

//Mapbox --------------------------------------
export interface Properties {
  accuracy: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Context {
  id: string;
  text: string;
  wikidata: string;
  short_code: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface RespostaBuscaEnderecoMapbox {
  attribution: string;
  features: Feature[];
  query: [];
  type: string;
}
// -----------------------------------------------

@Injectable({
  providedIn: 'root',
})
export class NgLocalizacaoService {
  constructor(private http: HttpClient) { }

  /**
   * Busca o endereço a partir do CEP
   *
   * @param asCep
   * @param asMapboxTokenAcesso
   */
  buscarPorCep(asCep: string | null, asMapboxTokenAcesso?: string | null): Observable<Endereco> {
    const loEnderecoViaCepObservavel: Observable<EnderecoViaCep> = of(asCep).pipe(
      validarCep(),
      switchMap((cepValido) => {
        return this.http.get<EnderecoViaCep>(`${URL_VIACEP}/${cepValido}/json`);
      }),
      map((loEnderecoViaCep) => {
        if ('cep' in loEnderecoViaCep) {
          return loEnderecoViaCep;
        }
        throw new Erro(CodigoErro.CEP_NAO_ENCONTRADO);
      })
    );

    return of(loEnderecoViaCepObservavel).pipe(
      switchMap(async (): Promise<Endereco> => {
        const loEnderecoViaCep = await loEnderecoViaCepObservavel.toPromise() as EnderecoViaCep;
        return this.http.get<RespostaBuscaEnderecoMapbox>(`${URL_MAPBOX}/${loEnderecoViaCep.logradouro}
          .json?types=address&access_token=${asMapboxTokenAcesso}`).pipe(
          map((loRespostaBuscaEnderecoMapbox) => {
            const loEndereco: Endereco = {
              bairro: loEnderecoViaCep.bairro,
              cep: loEnderecoViaCep.cep,
              cidade: loEnderecoViaCep.localidade,
              complemento: loEnderecoViaCep.complemento,
              codigoIbge: loEnderecoViaCep.ibge,
              logradouro: loEnderecoViaCep.logradouro,
              uf: loEnderecoViaCep.uf,
              ddd: parseInt(loEnderecoViaCep.ddd),
              gia: loEnderecoViaCep.gia,
              siafi: loEnderecoViaCep.siafi,
              linkIbge: `${URL_IBGE}/${loEnderecoViaCep.uf}/${loEnderecoViaCep.localidade}`
                .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]/g, "-"),
              latitude: loRespostaBuscaEnderecoMapbox.features[0].geometry.coordinates[1],
              longitude: loRespostaBuscaEnderecoMapbox.features[0].geometry.coordinates[0],
            };
            return loEndereco;
          })
        ).toPromise();
      }),
      map((loEndereco) => {
        if ('latitude' in loEndereco && 'longitude' in loEndereco) {
          const loLinkMapa: Partial<typeof loEndereco> = {
            linkMapa: `${URL_GOOGLE_MAPS_SEARCH}${loEndereco.latitude},${loEndereco.longitude}`
          };
          return { ...loEndereco, ...loLinkMapa };
        }
        throw new Erro(CodigoErro.COORDENADA_NAO_ENCONTRADA);
      })
    );
  }

  /**
   * Faz a busca aproximada
   *
   * @param uf
   * @param cidade
   * @param logradouro
   */
  buscarPorEndereco(
    uf: string,
    cidade: string,
    logradouro: string,
    asMapboxTokenAcesso?: string | null
  ): Observable<Endereco[]> {
    const loaEnderecoViaCepObservavel: Observable<EnderecoViaCep[]> = of({ uf, cidade, logradouro }).pipe(
      validarEndereco(),
      switchMap(() => this.http.get<EnderecoViaCep[]>(`${URL_VIACEP}/${uf}/${cidade}/${logradouro}/json`))
    );

    return of(loaEnderecoViaCepObservavel).pipe(
      switchMap(async () => {
        const loaEnderecoViaCep = await loaEnderecoViaCepObservavel.toPromise() as EnderecoViaCep[];
        let loaEndereco: Endereco[] = [];
        loaEnderecoViaCep.forEach(async loEnderecoViaCep => {
          const loRespostaBuscaEnderecoMapbox =
            await this.http.get<RespostaBuscaEnderecoMapbox>(`${URL_MAPBOX}/${loEnderecoViaCep.logradouro}
            .json?types=address&access_token=${asMapboxTokenAcesso}`).toPromise();
          const loEndereco: Endereco = {
            bairro: loEnderecoViaCep.bairro,
            cep: loEnderecoViaCep.cep,
            cidade: loEnderecoViaCep.localidade,
            complemento: loEnderecoViaCep.complemento,
            codigoIbge: loEnderecoViaCep.ibge,
            logradouro: loEnderecoViaCep.logradouro,
            uf: loEnderecoViaCep.uf,
            ddd: parseInt(loEnderecoViaCep.ddd),
            gia: loEnderecoViaCep.gia,
            siafi: loEnderecoViaCep.siafi,
            linkIbge: `${URL_IBGE}/${loEnderecoViaCep.uf}/${loEnderecoViaCep.localidade}`
              .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]/g, "-"),
            latitude: loRespostaBuscaEnderecoMapbox.features[0].geometry.coordinates[1],
            longitude: loRespostaBuscaEnderecoMapbox.features[0].geometry.coordinates[0],
            linkMapa: `${URL_GOOGLE_MAPS_SEARCH}${loRespostaBuscaEnderecoMapbox.features[0].geometry.coordinates[1]},
              ${loRespostaBuscaEnderecoMapbox.features[0].geometry.coordinates[0]}`
          };
          loaEndereco.push(loEndereco);
        });
        return loaEndereco;
      })
    );
  }
}
