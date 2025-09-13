import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { BusService } from '../../services/bus.service';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-update-bus',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-bus.html'
})
export class UpdateBus implements OnInit {
  form!: busI;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private svc: BusService
  ) {}

  ngOnInit(): void {
    const id = Number(this.ar.snapshot.paramMap.get('id'));
    const found = this.svc.getById(id);
    if (!found) {
      alert('Bus no encontrado');
      this.router.navigate(['/bus']);
      return;
    }
    // clonar para no mutar el store
    this.form = { ...found };
  }

  onDateChange(field: keyof busI, ev: Event) {
    const d = (ev.target as HTMLInputElement).valueAsDate || undefined;
    (this.form as any)[field] = d;
  }

  save() {
    if (!this.form.plate || !this.form.capacity || !this.form.mileage) {
      alert('Completa: Placa, Capacidad y Kilometraje');
      return;
    }
    this.form.plate = this.form.plate.trim().toUpperCase();
    this.form.updatedAt = new Date();
    this.svc.update(this.form);
    this.router.navigate(['/bus']);
  }

  cancel() {
    this.router.navigate(['/bus']);
  }
}
