import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { ItineraryService } from '../../services/itinerary.service';
import { ItineraryI, ItineraryStatus } from '../../models/itinerary.models';

@Component({
  selector: 'app-update-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-itinerary.html'
})
export class UpdateItinerary implements OnInit {
  form?: ItineraryI;
  dateInput = '';
  loading = false;
  saving = false;
  error?: string;

  private itineraryId!: number;

  constructor(
    private readonly ar: ActivatedRoute,
    private readonly router: Router,
    private readonly svc: ItineraryService
  ) {}

  ngOnInit(): void {
    const raw = this.ar.snapshot.paramMap.get('id');
    this.itineraryId = raw ? Number(raw) : NaN;
    if (Number.isNaN(this.itineraryId)) {
      alert('Identificador inválido');
      this.router.navigate(['/itinerary']);
      return;
    }
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.error = undefined;
    this.svc.getById(this.itineraryId).subscribe({
      next: itinerary => {
        this.form = { ...itinerary };
        this.dateInput = itinerary.date ? new Date(itinerary.date).toISOString().slice(0, 10) : '';
        this.loading = false;
      },
      error: err => {
        console.error('Error cargando itinerario', err);
        this.error = 'No se pudo cargar el itinerario.';
        this.loading = false;
      }
    });
  }

  private normalizeTime(value?: string): string {
    if (!value) {
      return '';
    }
    return value.length === 5 ? `${value}:00` : value;
  }

  save(): void {
    if (
      !this.form?.routeId ||
      !this.dateInput ||
      !this.form.departureTime ||
      !this.form.arrivalTime ||
      !this.form.driverId ||
      !this.form.busId
    ) {
      alert('Completa Ruta, Fecha, Horas, Conductor y Bus.');
      return;
    }

    const payload: ItineraryI = {
      id: this.form.id,
      routeId: Number(this.form.routeId),
      date: new Date(this.dateInput),
      departureTime: this.normalizeTime(this.form.departureTime),
      arrivalTime: this.normalizeTime(this.form.arrivalTime),
      driverId: Number(this.form.driverId),
      busId: Number(this.form.busId),
      status: (this.form.status as ItineraryStatus) ?? 'ACTIVO',
      notes: this.form.notes?.trim() ? this.form.notes.trim() : null
    };

    this.saving = true;
    this.error = undefined;
    this.svc.update(this.itineraryId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/itinerary']);
      },
      error: err => {
        console.error('Error actualizando itinerario', err);
        this.error = 'No se pudo actualizar el itinerario.';
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/itinerary']);
  }
}
