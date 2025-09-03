import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

export interface Acudiente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  direccion: string;
  estudiante: string; // nombre o id del estudiante asociado
}

@Component({
  selector: 'app-crear-acudiente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-acudiente.html',
  styleUrls: ['./crear-acudiente.css']
})
export class CrearAcudiente {
  creado = false;

  acudiente: Acudiente = {
    id: '',
    nombre: '',
    documento: '',
    telefono: '',
    direccion: '',
    estudiante: ''
  };

  constructor(private router: Router) {}

  crear(form: NgForm) {
    if (form.invalid) return;

    // SIMULACIÓN: aquí iría tu POST al backend
    this.creado = true;

    // Redirigir al listado después de mostrar el OK (opcional)
    setTimeout(() => this.router.navigate(['/acudientes']), 1500);
  }

  limpiar(form: NgForm) {
    form.resetForm({
      id: '',
      nombre: '',
      documento: '',
      telefono: '',
      direccion: '',
      estudiante: ''
    });
    this.creado = false;
  }
}
