import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgregarComponent } from "./componentes/agregar/agregar.component";
import { DashboardComponent } from "./componentes/dashboard/dashboard.component";
import { EditarComponent } from "./componentes/editar/editar.component";
import { LoginComponent } from "./componentes/login/login.component";
import { NoEncontradoComponent } from "./componentes/no-encontrado/no-encontrado.component";
import { RegistroComponent } from "./componentes/registro/registro.component";
import { GuardAutenticacion } from "./guardianes/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "registrarse", component: RegistroComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [GuardAutenticacion],
  },
  {
    path: "agregar",
    component: AgregarComponent,
    canActivate: [GuardAutenticacion],
  },
  {
    path: "paciente/editar/:id",
    component: EditarComponent,
    canActivate: [GuardAutenticacion],
  },
  { path: "**", component: NoEncontradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
