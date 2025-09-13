import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { MantenimientoBusService } from '../../services/mantenimiento-bus.service';
import { BusService } from '../../services/bus.service';

import { maintenanceI } from '../../models/mantenimientoBus.models';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-add-mantenimiento-bus',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-mantenimiento-bus.html'
})
export class AddMantenimientoBus {
  buses: busI[] = [];

  // Modelo del form
  form: Partial<maintenanceI> = {
    busId: undefined!,
    type: 'PREVENTIVO',
    description: '',
    cost: undefined,
    performedAt: new Date(),
    nextDueDate: undefined,
    status: 'PENDIENTE',
    mechanic: '',
    odometer: undefined
  };

  // Helpers para inputs <date>
  performedAtInput = '';
  nextDueInput = '';

  constructor(
    private mantSvc: MantenimientoBusService,
    private busSvc: BusService,
    private router: Router
  ) {
    this.buses = (this.busSvc as any).getAll?.() ?? [];
    // inicializar fecha de hoy en el input
    const today = new Date().toISOString().slice(0, 10);
    this.performedAtInput = today;
    this.form.performedAt = new Date(today);
  }

  onPerformedChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.performedAtInput = v;
    this.form.performedAt = v ? new Date(v) : undefined;
  }

  onNextDueChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.nextDueInput = v;
    this.form.nextDueDate = v ? new Date(v) : undefined;
  }

  save() {
    // Validaciones mínimas
    if (!this.form.busId || !this.form.type || !this.form.description?.trim() || !this.form.performedAt || !this.form.status) {
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

    const payload: maintenanceI = {
      id: 0,
      busId: Number(this.form.busId),
      type: this.form.type!,
      description: this.form.description!.trim(),
      cost: this.form.cost != null ? Number(this.form.cost) : undefined,
      performedAt: this.form.performedAt!,
      nextDueDate: this.form.nextDueDate,
      status: this.form.status!,
      mechanic: this.form.mechanic?.trim() || undefined,
      odometer: this.form.odometer != null ? Number(this.form.odometer) : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.mantSvc.add(payload);
    this.router.navigate(['/mantenimiento']);
  }

  cancel() {
    this.router.navigate(['/mantenimiento']);
  }
}
