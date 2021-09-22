import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/servicios/login.service";

@Component({
  selector: "app-cabecero",
  templateUrl: "./cabecero.component.html",
  styleUrls: ["./cabecero.component.css"],
})
export class CabeceroComponent implements OnInit {
  //variables para controlar opciones de sesion
  sesionActiva: boolean;
  loginUser: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    //Verificar si hay usuario logueado
    this.loginService.getUserAuth().subscribe((user) => {
      if (user) {
        this.sesionActiva = true;
        this.loginUser = user.email;
      } else {
        this.sesionActiva = false;
        this.loginUser = "";
      }
    });
  }

  cerrarSesion() {
    this.loginService.logOut();
    this.sesionActiva = false;
    this.router.navigate(["/login"]);
  }
}
