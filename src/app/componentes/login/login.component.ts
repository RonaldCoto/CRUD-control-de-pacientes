import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/servicios/login.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private notifications: ToastrService
  ) {}

  ngOnInit(): void {
    //Verificar si hay usuario logueado
    this.loginService.getUserAuth().subscribe((user) => {
      if (user) {
        this.router.navigate(["dashboard"]);
      }
    });
  }

  //Método para consumir servicio de onLogin
  login() {
    this.loginService
      .onLogin(this.email, this.password)
      .then((resultado) => {
        this.notifications.success(
          "Autenticación exitosa",
          "Iniciando sesión",
          {
            timeOut: 5000,
          }
        );
        this.router.navigate(["dashboard"]);
      })
      .catch((error) => {
        this.notifications.error(error.message, "Error de inicio de sesión", {
          timeOut: 7000,
        });
      });
  }
}
