import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Paciente } from "src/app/modelos/paciente.model";
import { Pacientes } from "src/app/servicios/paciente.service";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.component.html",
  styleUrls: ["./agregar.component.css"],
})
export class AgregarComponent implements OnInit {
  //declaración del objeto que guarda datos del form para utilizarlo en el servicio
  paciente: Paciente = {
    id: "",
    Nombre: "",
    DUI: "",
    Telefono: "",
    Correo: "",
    FechaNacimiento: "",
    Genero: "Masculino",
    Direccion: "",
    CodigoPostal: "",
  };

  constructor(private router: Router, private notifications: ToastrService, private pacienteService:Pacientes) {}

  ngOnInit(): void {}

  agregar({ value, valid }: { value: Paciente; valid: boolean }) {
    if (!valid) {
      this.notifications.error("Por favor llena el formulario correctamente", "Error en envío de formulario", {
        timeOut: 7000,
      });
    }else{
      this.notifications.success("Paciente agregado","Petición realizada con éxito!")
      this.pacienteService.agregarPaciente(value);
      this.router.navigate(["dashboard"]);
    }
  }
}
