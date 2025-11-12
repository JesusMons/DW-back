import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { ItineraryService } from '../../services/itinerary.service';
import { ItineraryI } from '../../models/itinerary.models';

@Component({
  selector: 'app-get-itinerary',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-itinerary.html'
})
export class GetItinerary implements OnInit, OnDestroy {
  itineraries: ItineraryI[] = [];
  detailsVisible = false;
  selectedItinerary?: ItineraryI;
  loading = false;

  private subscription?: { unsubscribe: () => void };

  constructor(private readonly svc: ItineraryService) {}

  ngOnInit(): void {
    this.subscription = this.svc.itineraries$.subscribe(list => (this.itineraries = list));
    this.loading = true;
    this.svc.fetchAll().subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id?: number): void {
    if (!id || !confirm('¿Eliminar este itinerario?')) {
      return;
    }
    this.svc.delete(id).subscribe({
      error: () => alert('No se pudo eliminar el itinerario.')
    });
  }

  deactivate(id?: number): void {
    if (!id || !confirm('¿Marcar este itinerario como INACTIVO?')) {
      return;
    }
    this.svc.deactivate(id).subscribe({
      error: () => alert('No se pudo actualizar el estado.')
    });
  }

  showDetails(it: ItineraryI) {
    this.selectedItinerary = it;
    this.detailsVisible = true;
  }

  statusSeverity(status?: ItineraryI['status']) {
    return status === 'ACTIVO' ? 'success' : 'danger';
  }
}
