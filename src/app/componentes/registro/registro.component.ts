import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "src/app/servicios/login.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  //atributos para databinding
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

  registrarse() {
    this.loginService
      .registrarUsuario(this.email, this.password)
      .then((res) => {
        this.router.navigate(["dashboard"]);
      })
      .catch((error) => {
        this.notifications.error(error.message, "Error al registrarse!", {
          timeOut: 7000,
        });
      });
  }
}
