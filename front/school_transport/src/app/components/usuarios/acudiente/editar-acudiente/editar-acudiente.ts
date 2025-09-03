import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

export interface Acudiente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  direccion: string;
  estudiante: string; // nombre o id del estudiante asociado
}

@Component({
  selector: 'app-editar-acudiente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-acudiente.html',
  styleUrls: ['./editar-acudiente.css']
})
export class EditarAcudiente {
  cargando = true;
  guardado = false;

  acudiente: Acudiente = {
    id: '',
    nombre: '',
    documento: '',
    telefono: '',
    direccion: '',
    estudiante: ''
  };

  // Mock local
  private mockDB: Acudiente[] = [
    { id: 'AC-001', nombre: 'Ana Pérez',  documento: '900123456', telefono: '3001112222', direccion: 'Calle 123',  estudiante: 'Laura Pérez' },
    { id: 'AC-002', nombre: 'Luis Gómez', documento: '900234567', telefono: '3012223333', direccion: 'Carrera 45', estudiante: 'Carlos Gómez' },
    { id: 'AC-003', nombre: 'Julia Rivas', documento: '900345678', telefono: '3023334444', direccion: 'Av. 10',    estudiante: 'María Rivas' },
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';

    let found = id ? this.mockDB.find(a => a.id === id) : undefined;

    // Si no existe en mock y hay id -> crear uno temporal para editar
    if (!found && id) {
      found = {
        id,
        nombre: '',
        documento: '',
        telefono: '',
        direccion: '',
        estudiante: ''
      };
      this.mockDB.push(found);
    }

    if (found) this.acudiente = { ...found };
    this.cargando = false;
  }

  guardar(form: NgForm) {
    if (form.invalid) return;

    // Simular actualización en "BD"
    const idx = this.mockDB.findIndex(a => a.id === this.acudiente.id);
    if (idx >= 0) this.mockDB[idx] = { ...this.acudiente };

    this.guardado = true;

    // Redirigir al listado tras mostrar el OK
    setTimeout(() => this.router.navigate(['/acudientes']), 1200);
  }

  cancelar() {
    this.router.navigate(['/acudientes']);
  }
}
