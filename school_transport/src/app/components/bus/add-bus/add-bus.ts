import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { BusService } from '../../services/bus.service';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-add-bus',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-bus.html'
})
export class AddBus {
  form: Partial<busI> = {
    plate: '',
    capacity: undefined,
    mileage: undefined,
    model: '',
    brand: '',
    year: undefined,
    color: '',
    status: 'ACTIVO',
    insuranceExpiry: undefined,
    lastMaintenance: undefined,
    nextMaintenance: undefined
  };

  constructor(private svc: BusService, private router: Router) {}

  save() {
    // Validaciones básicas
    if (!this.form.plate || !this.form.capacity || !this.form.mileage) {
      alert('Completa: Placa, Capacidad y Kilometraje');
      return;
    }

    const bus: busI = {
      id: 0,
      plate: this.form.plate!.trim().toUpperCase(),
      capacity: Number(this.form.capacity),
      mileage: Number(this.form.mileage),
      model: this.form.model?.trim(),
      brand: this.form.brand?.trim(),
      year: this.form.year ? Number(this.form.year) : undefined,
      color: this.form.color?.trim(),
      status: (this.form.status as any) || 'ACTIVO',
      insuranceExpiry: this.form.insuranceExpiry ? new Date(this.form.insuranceExpiry) : undefined,
      lastMaintenance: this.form.lastMaintenance ? new Date(this.form.lastMaintenance) : undefined,
      nextMaintenance: this.form.nextMaintenance ? new Date(this.form.nextMaintenance) : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.svc.add(bus);
    this.router.navigate(['/bus']);
  }

  cancel() {
    this.router.navigate(['/bus']);
  }

  onDateChange(field: keyof busI, ev: Event) {
    const d = (ev.target as HTMLInputElement).valueAsDate || undefined;
    (this.form as any)[field] = d;
  }
}
