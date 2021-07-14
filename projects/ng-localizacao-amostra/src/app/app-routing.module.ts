import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./components/inicio/inicio.module').then((m) => m.InicioModule),
  },
  { path: 'busca-cep', loadChildren: () => import('./components/busca-cep/busca-cep.module').then(m => m.BuscaCepModule) },
  { path: 'busca-endereco', loadChildren: () => import('./components/busca-endereco/busca-endereco.module').then(m => m.BuscaEnderecoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
