import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

export interface Itinerario {
  id: string;
  ruta: string;
  fecha: string;       // YYYY-MM-DD
  hora: string;        // HH:mm
  paradas: string;
  observaciones: string;
}

@Component({
  selector: 'app-editar-itinerario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-itinerario.html',
  styleUrls: ['./editar-itinerario.css']
})
export class EditarItinerario {
  cargando = true;
  guardado = false;
  noEncontrado = false;

  itinerario: Itinerario = {
    id: '',
    ruta: '',
    fecha: '',
    hora: '',
    paradas: '',
    observaciones: ''
  };

  // MOCK DB (simulación)
  private mockDB: Itinerario[] = [
    { id: 'IT-001', ruta: 'R-001', fecha: '2025-09-10', hora: '06:30', paradas: 'El Prado; Centro; Colegio', observaciones: 'Primer turno' },
    { id: 'IT-002', ruta: 'R-002', fecha: '2025-09-10', hora: '15:10', paradas: 'Colegio; San José', observaciones: 'Segundo turno' }
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';

    // 1) Intentar encontrar
    let found = this.mockDB.find(x => x.id === id);

    // 2) Si no existe y estamos en simulación, AUTOGENERAR uno con ese id
    if (!found && id) {
      found = {
        id,
        ruta: 'R-001',
        fecha: new Date().toISOString().slice(0,10), // hoy
        hora: '06:30',
        paradas: '',
        observaciones: 'Generado en simulación'
      };
      // opcional: lo agregamos al mock para "persistirlo" en memoria durante la sesión
      this.mockDB.push(found);
    }

    if (!id) {
  this.itinerario = { id: 'IT-NEW', ruta: '', fecha: '', hora: '', paradas: '', observaciones: '' };
  this.noEncontrado = false; // ✅ mostramos formulario nuevo
  this.cargando = false;
  return;
}

    this.cargando = false;
  }

  guardar(form: NgForm) {
    if (form.invalid) return;

    // Simulación de guardado: actualizar en mock
    const idx = this.mockDB.findIndex(x => x.id === this.itinerario.id);
    if (idx >= 0) {
      this.mockDB[idx] = { ...this.itinerario };
    } else {
      this.mockDB.push({ ...this.itinerario });
    }

    this.guardado = true;

    setTimeout(() => {
      this.router.navigate(['/mostrar-itinerarios']);
    }, 1200);
  }

  cancelar() {
    this.router.navigate(['/mostrar-itinerarios']);
  }
}
