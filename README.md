# ng-localizacao

Uma biblioteca Angular para busca de CEP, endereço e geocódigo pelos diversos serviços disponíveis a seguir: 
[ViaCep](https://viacep.com.br), 
[OpenStreetMap](https://www.openstreetmap.org), 
[Mapbox](https://www.mapbox.com), 
[Google Maps](https://www.google.com/maps).
Foi desenvolvida utilizando como base a biblioteca [ngx-viacep](https://github.com/brunoc107/ngx-viacep).

![npm-publish](https://github.com/apsoftwaresi/ng-localizacao/workflows/npm-publish/badge.svg)
![npm (scoped)](https://img.shields.io/npm/v/@apsoftwaresi/ng-localizacao)
![npm](https://img.shields.io/npm/dw/@apsoftwaresi/ng-localizacao)
![NPM](https://img.shields.io/npm/l/@apsoftwaresi/ng-localizacao)
![GitHub Repo stars](https://img.shields.io/github/stars/apsoftwaresi/ng-localizacao?style=social)

## Instruções de uso do projeto

yarn:
```sh
yarn
yarn build
yarn start
```

npm:
```sh
npm i
npm run build
npm start
```

## Instalação

yarn:
```bash
yarn add @apsoftwaresi/ng-localizacao
yarn add @types/apsoftwaresi/ng-localizacao -D
```

npm:
```bash
npm install @apsoftwaresi/ng-localizacao --save
```

## Instruções

No módulo onde for necessário buscar CEP, importar `NgLocalizacaoModule` e adicionar aos imports, como no exemplo abaixo:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { NgLocalizacaoModule } from "@apsoftwaresi/ng-localizacao"; // Importando o módulo

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgLocalizacaoModule, // Registrando o módulo
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

No componente onde a funcionalidade for necessária, importar o serviço `NgLocalizacaoService` e injetá-lo:

```typescript
import { Component } from "@angular/core";
import { OnInit } from "@angular/core/";

import { NgLocalizacaoService } from "@apsoftwaresi/ng-localizacao"; // Importando o serviço

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";
  constructor(private viacep: NgLocalizacaoService) {} // Injetando o serviço

  ngOnInit() {}
}
```

## Buscar endereço por CEP

O serviço `NgLocalizacaoService` possui um método para a busca de endereço por CEP, que retorna um Observable, seu uso pode 
ser visto abaixo:

```typescript
this.viacep
  .buscarPorCep("01001000")
  .pipe(
    catchError((error: CEPError) => {
      // Ocorreu algum erro :/
      console.log(error.message);
      return EMPTY;
    })
  )
  .subscribe((endereco: Endereco) => {
    // Endereço retornado :)
    console.log(endereco);
  });
```

As interfaces `Endereco`, `CEPError` e o enum `CEPErrorCode` podem ser importadas da mesma maneira que o serviço, como 
no exemplo:

```typescript
import {
  NgLocalizacaoService,
  Endereco,
  CEPError,
  CEPErrorCode,
} from "@apsoftwaresi/ng-localizacao";
```

## Busca sem CEP

Para buscar um endereço cujo cep não é conhecido, pode-se utilizar o método a seguir:

```typescript
this.viacep
  .buscarPorEndereco("rs", "porto alegre", "domingos")
  .pipe(
    catchError((error: CEPError) => {
      // Ocorreu algum erro :/
      console.log(error.message);
      return EMPTY;
    })
  )
  .subscribe((enderecos: Endereco[]) => {
    // Array de endereços possíveis retornados :D
    console.log(enderecos);
  });
```

O método `buscarPorEndereco` faz uma pesquisa e retorna uma lista de endereços no estado e cidade definidos, cujo 
logradouro possua no nome o valor passado no terceiro argumento.

## Tratamento de erros

O Serviço `NgLocalizacaoService` utiliza a classe `CEPError` para o lançamento de todas as exceções relacionadas à busca de 
CEP ou Endereço.

A classe `CEPError` possui o método `getCode`.

O enum `CEPErrorCode` que contém os códigos correspondentes a **todos** os erros lançados pelo serviço `NgLocalizacaoService`.

Abaixo encontra-se o código do enum:

```typescript
export enum CEPErrorCode {
  CEP_NAO_ENCONTRADO,
  CEP_VAZIO,
  CEP_INVALIDO,
  CEP_MUITO_CURTO,
  CEP_MUITO_LONGO,
  UF_VAZIA,
  UF_MUITO_CURTA,
  UF_MUITO_LONGA,
  UF_NAO_EXISTE,
  MUNICIPIO_VAZIO,
  MUNICIPIO_MUITO_CURTO,
  LOGRADOURO_VAZIO,
  LOGRADOURO_MUITO_CURTO,
  ERRO_SERVIDOR,
}
```

É possível fazer a verificação do erro retornado como no exemplo a seguir:

```typescript
switch (error.getCode()) {
  case CEPErrorCode.UF_VAZIA:
    console.log("Por favor, informe a UF.");
    break;
  case CEPErrorCode.UF_NAO_EXISTE:
    console.log("A UF informada não foi encontrada.");
    break;
  // Quaisquer outros erros contidos em CEPErrorCode podem ser tratados assim
}
```

O método `ofType` pode ser utilizado para tratar tipos específicos, como no exemplo a seguir:

```typescript
if (error.ofType(CEPErrorCode.UF_VAZIA)) {
  console.log("Ops! Parece que vc não informou a UF ¬¬");
}
```

A propriedade `message` da classe `CEPError` conterá uma string com o tipo do erro:

```typescript
try {
  throw new CEPError(CEPErrorCode.UF_VAZIA);
} catch (error) {
  // Logará a string "UF_VAZIA" no console
  console.log(error.message);
}
```

## Licença

MIT © [Caique Pimenta](mailto:cpimenta.apsoftware@gmail.com)
