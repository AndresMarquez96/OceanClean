import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { CampComponent } from './campanas/camp.component';
import { CompComponent } from './compromiso/comp.component';
import { OrgComponent } from './organizaciones/org.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MapasComponent } from './mapas/mapas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicSesionComponent } from './inic-sesion/inic-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { ModificarComponent } from './modificar/modificar.component';
import { CrearCampanaComponent } from './crear-campana/crear-campana.component';
import { ModCampanaComponent } from './mod-campana/mod-campana.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CampComponent,
    CompComponent,
    OrgComponent,
    PerfilComponent,
    MapasComponent,
    ContactoComponent,
    InicSesionComponent,
    RegistroComponent,
    ModificarComponent,
    CrearCampanaComponent,
    ModCampanaComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }