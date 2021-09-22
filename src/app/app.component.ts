import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "control-pacientes";
  
  //Método para posicionar el scroll hasta arriba en las paginas
  onActivate(event) {
    window.scroll(0, 0);
  }
}
