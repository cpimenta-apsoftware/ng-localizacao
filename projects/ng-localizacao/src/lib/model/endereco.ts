export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;  
  codigoIbge: string;  
  latitude?: number;
  longitude?: number;
  ddd?: number;
  gia?: string;
  siafi?: string;
  linkIbge?: string;
  linkMapa?: string;
}
