import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Paciente } from "src/app/modelos/paciente.model";
import { Pacientes } from "src/app/servicios/paciente.service";

@Component({
  selector: "app-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"],
})
export class EditarComponent implements OnInit {
  //declaración del objeto que almacena los atributos del objeto del id que recibimos por el routerlink
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

  //variable para recibir el id del routerlink
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pacienteService: Pacientes,
    private notifications: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.pacienteService.getPaciente(this.id).subscribe((data) => {
      this.paciente = data; //meto en el objeto paciente lo que retorna mi servicio
    });
  }

  //Método para editar el paciente haciendo uso del servicio de modificar
  editar({ value, valid }: { value: Paciente; valid: boolean }) {
    if (!valid) {
      this.notifications.error(
        "Por favor llena el formulario correctamente",
        "Error en envío de formulario",
        {
          timeOut: 7000,
        }
      );
    } else {
      this.notifications.success(
        "Paciente editado",
        "Petición realizada con éxito!"
      );
      value.id = this.id;
      this.pacienteService.modificarPaciente(value);
      this.router.navigate(["dashboard"]);
    }
  }
}
