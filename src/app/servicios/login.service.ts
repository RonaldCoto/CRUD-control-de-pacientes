import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable()
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  //Método para loguearse por email y contraseña en firebase
  onLogin(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, pass).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }

  //Método para recuperar el usuario logueado
  getUserAuth() {
    return this.authService.authState.pipe(
      map((auth) => {
        return auth;
      })
    );
  }

  //Método para cerrar sesión
  logOut() {
    this.authService.signOut();
  }

  //Método para registrarse
  registrarUsuario(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, pass).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }
}
