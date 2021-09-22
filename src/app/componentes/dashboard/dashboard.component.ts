import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Paciente } from "src/app/modelos/paciente.model";
import { Pacientes } from "src/app/servicios/paciente.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  //Declaracion de arreglo de tipo modelo Paciente
  pacientes: Paciente[];

  constructor(
    private pacienteService: Pacientes,
    private notifications: ToastrService
  ) {}

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes = data;
    });
  }

  //Método que recibe el parametro del paciente del html para pasarlo al servicio de eliminar paciente
  eliminar(id: string) {
    if (confirm("¿Seguro que quiere eliminar este paciente de la lista?")) {
      this.pacienteService.eliminarPaciente(id);
      this.notifications.success(
        "Paciente eliminado",
        "Petición realizada con éxito!"
      );
    }
  }
}
