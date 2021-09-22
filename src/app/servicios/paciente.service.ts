import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Paciente } from "../modelos/paciente.model";

@Injectable()
export class Pacientes {
  //Atributos relacionados a firestore
  PacientesColeccion: AngularFirestoreCollection<Paciente>;
  PacienteDocumento: AngularFirestoreDocument<Paciente>;

  //Atributos para almacenar lo que proviene de firestore
  pacientes: Observable<Paciente[]>;
  paciente: Observable<Paciente>;

  constructor(private bdd: AngularFirestore) {
    this.PacientesColeccion = bdd.collection("pacientes", (orden) =>
      orden.orderBy("Nombre", "asc")
    );
  }

  //Metodo para traer todos los pacientes de la coleccion, retornará un observable de tipo arreglo paciente
  getPacientes(): Observable<Paciente[]> {
    this.pacientes = this.PacientesColeccion.snapshotChanges().pipe(
      map((data) => {
        return data.map((accion) => {
          const datos = accion.payload.doc.data() as Paciente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.pacientes;
  }

  //Método para agregar un nuevo paciente a la coleccion de firestore
  agregarPaciente(paciente: Paciente) {
    this.PacientesColeccion.add(paciente);
  }

  //Método para eliminar un paciente de la coleccion de firestore
  eliminarPaciente(id: string) {
    this.PacienteDocumento = this.bdd.doc<Paciente>(`pacientes/${id}`); //le pasamos el id a la coleccion pacientes para encontrar la coincidencia en firestore
    this.PacienteDocumento.delete();
  }

  //Metodo para traer los datos de un paciente
  getPaciente(id: string) {
    this.PacienteDocumento = this.bdd.doc<Paciente>(`pacientes/${id}`); //le pasamos el id a la coleccion pacientes para encontrar la coincidencia en firestore

    this.paciente = this.PacienteDocumento.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const dato = accion.payload.data() as Paciente;
          dato.id = accion.payload.id;
          return dato;
        }
      })
    );
    return this.paciente;
  }

  //Método para modificar los atributos de un paciente
  modificarPaciente(paciente: Paciente) {
    this.PacienteDocumento = this.bdd.doc<Paciente>(`pacientes/${paciente.id}`); //le pasamos el id a la coleccion pacientes para encontrar la coincidencia en firestore
    this.PacienteDocumento.update(paciente); //modifica con los valores recibidos en el objeto recibido como parametro (parametro paciente)
  }
}
