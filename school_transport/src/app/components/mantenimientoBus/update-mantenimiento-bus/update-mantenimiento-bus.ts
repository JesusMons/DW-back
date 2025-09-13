import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { MantenimientoBusService } from '../../services/mantenimiento-bus.service';
import { BusService } from '../../services/bus.service';

import { maintenanceI } from '../../models/mantenimientoBus.models';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-update-mantenimiento-bus',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-mantenimiento-bus.html'
})
export class UpdateMantenimientoBus implements OnInit {
  buses: busI[] = [];
  form!: maintenanceI;

  // helpers para inputs date
  performedAtInput = '';
  nextDueInput = '';

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private mantSvc: MantenimientoBusService,
    private busSvc: BusService
  ) {}

  ngOnInit(): void {
    this.buses = (this.busSvc as any).getAll?.() ?? [];

    const raw = this.ar.snapshot.paramMap.get('id');
    const id = raw !== null ? Number(raw) : NaN;
    if (Number.isNaN(id)) {
      alert('Ruta inválida: id no es un número');
      this.router.navigate(['/maintenance']);
      return;
    }

    const found = this.mantSvc.getById(id);
    if (!found) {
      alert('Mantenimiento no encontrado');
      this.router.navigate(['/maintenance']);
      return;
    }

    // clonar para edición
    this.form = { ...found };

    // inicializar inputs de fecha
    this.performedAtInput = this.form.performedAt
      ? new Date(this.form.performedAt).toISOString().slice(0, 10)
      : '';
    this.nextDueInput = this.form.nextDueDate
      ? new Date(this.form.nextDueDate).toISOString().slice(0, 10)
      : '';
  }

  onPerformedChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.performedAtInput = v;
    this.form.performedAt = v ? new Date(v) : this.form.performedAt;
  }

  onNextDueChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.nextDueInput = v;
    this.form.nextDueDate = v ? new Date(v) : undefined;
  }

  save() {
    // Validaciones mínimas
    if (!this.form.busId || !this.form.type || !this.form.description?.trim() || !this.performedAtInput || !this.form.status) {
      alert('Completa: Bus, Tipo, Descripción, Fecha realizada y Estado.');
      return;
    }
    if (this.form.cost != null && this.form.cost < 0) {
      alert('El costo no puede ser negativo.');
      return;
    }
    if (this.form.odometer != null && this.form.odometer < 0) {
      alert('El odómetro no puede ser negativo.');
      return;
    }

    // normalizar fechas desde inputs
    this.form.performedAt = new Date(this.performedAtInput);
    this.form.nextDueDate = this.nextDueInput ? new Date(this.nextDueInput) : undefined;
    this.form.updatedAt = new Date();

    this.mantSvc.update(this.form);
    this.router.navigate(['/mantenimiento']);
  }

  cancel() {
    this.router.navigate(['/mantenimiento']);
  }
}
