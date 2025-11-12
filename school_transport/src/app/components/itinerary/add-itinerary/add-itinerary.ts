import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { ItineraryService } from '../../services/itinerary.service';
import { ItineraryI, ItineraryStatus } from '../../models/itinerary.models';

@Component({
  selector: 'app-add-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-itinerary.html'
})
export class AddItinerary {
  form = {
    routeId: undefined as number | undefined,
    date: new Date().toISOString().slice(0, 10),
    departureTime: '',
    arrivalTime: '',
    driverId: undefined as number | undefined,
    busId: undefined as number | undefined,
    status: 'ACTIVO' as ItineraryStatus,
    notes: ''
  };

  loading = false;
  error?: string;

  constructor(private readonly svc: ItineraryService, private readonly router: Router) {}

  private normalizeTime(value: string): string {
    if (!value) return '';
    return value.length === 5 ? `${value}:00` : value;
  }

  save(): void {
    if (
      !this.form.routeId ||
      !this.form.date ||
      !this.form.departureTime ||
      !this.form.arrivalTime ||
      !this.form.driverId ||
      !this.form.busId
    ) {
      alert('Completa Ruta, Fecha, Horas, Conductor y Bus.');
      return;
    }

    const payload: ItineraryI = {
      routeId: Number(this.form.routeId),
      date: new Date(this.form.date),
      departureTime: this.normalizeTime(this.form.departureTime),
      arrivalTime: this.normalizeTime(this.form.arrivalTime),
      driverId: Number(this.form.driverId),
      busId: Number(this.form.busId),
      status: this.form.status,
      notes: this.form.notes?.trim() ? this.form.notes.trim() : null
    };

    this.loading = true;
    this.error = undefined;
    this.svc.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/itinerary']);
      },
      error: err => {
        console.error('Error creando itinerario', err);
        this.error = 'No se pudo crear el itinerario.';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/itinerary']);
  }
}
