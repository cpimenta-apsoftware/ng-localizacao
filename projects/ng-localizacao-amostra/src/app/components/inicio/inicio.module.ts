import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  imports: [
    CommonModule,
    InicioRoutingModule,
    MarkdownModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }
