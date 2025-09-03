import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

type Estado = 'ACTIVO' | 'INACTIVO';

export interface Estudiante {
  id: string;
  nombre: string;
  documento: string;
  grado: string;
  acudiente: string;
  telefono: string;
  estado: Estado;
}

@Component({
  selector: 'app-crear-estudi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-estudi.html',
  styleUrls: ['./crear-estudi.css']
})
export class CrearEstudi {
  creado = false;

  estudiante: Estudiante = {
    id: '',
    nombre: '',
    documento: '',
    grado: '',
    acudiente: '',
    telefono: '',
    estado: 'ACTIVO'
  };

  estados: Estado[] = ['ACTIVO', 'INACTIVO'];

  constructor(private router: Router) {}

  crear(form: NgForm) {
    if (form.invalid) return;

    // SIMULACIÓN: aquí iría el this.http.post(...)
    this.creado = true;

    // Opcional: redirigir al listado después de mostrar el OK
    setTimeout(() => {
      this.router.navigate(['/estudiantes']); // ajusta la ruta a tu listado
    }, 1500);
  }

  limpiar(form: NgForm) {
    form.resetForm({
      id: '',
      nombre: '',
      documento: '',
      grado: '',
      acudiente: '',
      telefono: '',
      estado: 'ACTIVO'
    });
    this.creado = false;
  }
}
