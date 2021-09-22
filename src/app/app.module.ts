import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CabeceroComponent } from "./componentes/cabecero/cabecero.component";
import { PiePaginaComponent } from "./componentes/pie-pagina/pie-pagina.component";
import { LoginComponent } from "./componentes/login/login.component";
import { DashboardComponent } from "./componentes/dashboard/dashboard.component";
import { AgregarComponent } from "./componentes/agregar/agregar.component";
import { EditarComponent } from "./componentes/editar/editar.component";
import { LoginService } from "./servicios/login.service";
import { Pacientes } from "./servicios/paciente.service";
import { GuardAutenticacion } from "./guardianes/auth.guard";
import { RegistroComponent } from './componentes/registro/registro.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    PiePaginaComponent,
    LoginComponent,
    DashboardComponent,
    AgregarComponent,
    EditarComponent,
    RegistroComponent,
    NoEncontradoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [LoginService, Pacientes, GuardAutenticacion],
  bootstrap: [AppComponent],
})
export class AppModule {}
