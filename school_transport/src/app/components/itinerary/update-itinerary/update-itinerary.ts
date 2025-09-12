import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ItineraryService  } from '../../services/itinerary.service';
import { ItineraryI } from '../../models/itinerary.models';

@Component({
  selector: 'app-update-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-itinerary.html'
})
export class UpdateItinerary implements OnInit {
  it?: ItineraryI;

  // inputs temporales para agregar paradas
  stop = '';
  time = '';

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private svc: ItineraryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.ar.snapshot.paramMap.get('id'));
    const found = this.svc.getById(id);
    if (!found) {
      alert('Itinerario no encontrado');
      this.router.navigate(['/itineraries']);
      return;
    }
    // clon para editar sin mutar la referencia
    this.it = { ...found, stopsSchedule: [...(found.stopsSchedule || [])] };
  }

  addStop() {
    if (!this.it) return;
    if (this.stop.trim() && this.time.trim()) {
      this.it.stopsSchedule.push({ stop: this.stop.trim(), time: this.time.trim() });
      this.stop = ''; this.time = '';
    }
  }

  removeStop(i: number) {
    if (!this.it) return;
    this.it.stopsSchedule.splice(i, 1);
  }

  save() {
    if (!this.it) return;
    // validaciones básicas
    if (!this.it.routeId || !this.it.departureTime || !this.it.arrivalTime) {
      alert('Completa ruta, salida y llegada.');
      return;
    }
    this.svc.update({ ...this.it, updatedAt: new Date() });
    this.router.navigate(['/itinerary']);
  }

  cancel() {
    this.router.navigate(['/itinerary']);
  }

  // helper para input date (binding a Date)
  onDateChange(ev: Event) {
    if (!this.it) return;
    const v = (ev.target as HTMLInputElement).valueAsDate;
    if (v) this.it.date = v;
  }
}
