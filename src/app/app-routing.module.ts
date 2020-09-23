import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { ErrorComponent } from './components/error/error.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { ListadoDeJugadoresComponent } from './components/listado-de-jugadores/listado-de-jugadores.component';
import { ListadoDeResultadosComponent } from './components/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from './components/login/login.component';
import { MemotestComponent } from './components/memotest/memotest.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { UnirPalabrasComponent } from './components/unir-palabras/unir-palabras.component';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent, canActivate: [NologinGuard] },
  {
    path: 'Registro',
    component: RegistroComponent,
    canActivate: [NologinGuard],
  },
  {
    path: 'Principal',
    component: PrincipalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Listado',
    component: ListadoDeResultadosComponent,
  },
  { path: 'AcercaDe', component: AcercaDeComponent },
  {
    path: 'Juegos',
    component: JuegosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MenuCardComponent },
      { path: 'Adivina', component: AdivinaElNumeroComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent },
      { path: 'Anagrama', component: AnagramaComponent },
      { path: 'Tateti', component: TatetiComponent },
      { path: 'PiedraPapelTijera', component: PiedraPapelTijeraComponent },
      { path: 'Memotest', component: MemotestComponent },
      { path: 'UnirPalabras', component: UnirPalabrasComponent },
      // { path: 'login', component: LoginComponent },
      // {
      //   path: 'registro',
      //   component: RegistroComponent,
      // },
    ],
  },
  { path: 'ListadoJugadores', component: ListadoDeJugadoresComponent },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
