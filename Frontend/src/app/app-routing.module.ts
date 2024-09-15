import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'campanas', component: CampComponent },
  { path: 'compromiso', component: CompComponent },
  { path: 'organizaciones', component: OrgComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'mapas', component: MapasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'logIn', component: InicSesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'modificar', component: ModificarComponent },
  { path: 'crearCampana', component: CrearCampanaComponent },
  { path: 'modCampana', component: ModCampanaComponent },
  { path: 'not-Found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
