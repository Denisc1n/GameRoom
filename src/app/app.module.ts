import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ListadoDeResultadosComponent } from './components/listado-de-resultados/listado-de-resultados.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { ErrorComponent } from './components/error/error.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { MemotestComponent } from './components/memotest/memotest.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UnirPalabrasComponent } from './components/unir-palabras/unir-palabras.component';
import { JuegoComponent } from './components/unir-palabras/juego/juego.component';
import { ShufflePipe } from './pipes/shuffle.pipe';
import { ListadoDeJugadoresComponent } from './components/listado-de-jugadores/listado-de-jugadores.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CabeceraComponent,
    FooterComponent,
    PrincipalComponent,
    RegistroComponent,
    LoginComponent,
    ListadoDeResultadosComponent,
    AcercaDeComponent,
    JuegosComponent,
    ErrorComponent,
    MenuCardComponent,
    AdivinaElNumeroComponent,
    AgilidadAritmeticaComponent,
    AnagramaComponent,
    TatetiComponent,
    PiedraPapelTijeraComponent,
    MemotestComponent,
    ResultadoComponent,
    UnirPalabrasComponent,
    JuegoComponent,
    ShufflePipe,
    ListadoDeJugadoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
