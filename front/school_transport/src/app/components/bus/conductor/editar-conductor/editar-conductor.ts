import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type Estado = 'ACTIVO' | 'INACTIVO';

export interface Conductor {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  licencia: string;       // C1, C2, A2, etc.
  venceLicencia: string;  // YYYY-MM-DD
  estado: Estado;
}

@Component({
  selector: 'app-editar-conductor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-conductor.html',
  styleUrls: ['./editar-conductor.css']
})
export class EditarConductor {
  cargando = true;
  guardado = false;

  conductor: Conductor = {
    id: '',
    nombre: '',
    documento: '',
    telefono: '',
    licencia: 'C1',
    venceLicencia: '',
    estado: 'ACTIVO'
  };

  estados: Estado[] = ['ACTIVO', 'INACTIVO'];
  licencias = ['C1', 'C2', 'C3', 'A1', 'A2', 'B1', 'B2'];

  // Mock local (simulación)
  private mockDB: Conductor[] = [
    { id: 'CD-001', nombre: 'Pedro López', documento: '80012345', telefono: '3001112233', licencia: 'C2', venceLicencia: '2026-03-15', estado: 'ACTIVO' },
    { id: 'CD-002', nombre: 'Marta Ruiz',  documento: '80023456', telefono: '3012223344', licencia: 'C1', venceLicencia: '2025-12-01', estado: 'ACTIVO' },
  ];

  constructor(private ar: ActivatedRoute, private router: Router) {
    const id = this.ar.snapshot.paramMap.get('id') ?? '';

    let found = id ? this.mockDB.find(c => c.id === id) : undefined;

    // Si no existe, crear uno temporal para editar
    if (!found && id) {
      found = {
        id,
        nombre: '',
        documento: '',
        telefono: '',
        licencia: 'C1',
        venceLicencia: new Date().toISOString().slice(0,10),
        estado: 'ACTIVO'
      };
      this.mockDB.push(found);
    }

    if (found) this.conductor = { ...found };

    this.cargando = false;
  }

  guardar(form: NgForm) {
    if (form.invalid) return;

    // Simula actualización en "BD"
    const idx = this.mockDB.findIndex(c => c.id === this.conductor.id);
    if (idx >= 0) this.mockDB[idx] = { ...this.conductor };

    this.guardado = true;

    // Redirige al listado tras mostrar el OK
    setTimeout(() => this.router.navigate(['/conductores']), 1200);
  }

  cancelar() {
    this.router.navigate(['/conductores']);
  }
}
