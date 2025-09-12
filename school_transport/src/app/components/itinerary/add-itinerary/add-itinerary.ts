import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ItineraryService  } from '../../services/itinerary.service';
import { ItineraryI } from '../../models/itinerary.models';

@Component({
  selector: 'app-add-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-itinerary.html'
})
export class AddItinerary {
  form: Partial<ItineraryI> = {
    routeId: 1,
    date: new Date(),
    departureTime: '',
    arrivalTime: '',
    stopsSchedule: [],
    driver: '',
    bus: 0,
    status: 'PLANEADO',
    notes: ''
  };

  stop = '';
  time = '';
  stops: { stop: string; time: string }[] = [];

  constructor(private svc: ItineraryService, private router: Router) {}

  addStop() {
    if (this.stop.trim() && this.time.trim()) {
      this.stops.push({ stop: this.stop.trim(), time: this.time.trim() });
      this.stop = '';
      this.time = '';
    }
  }

  removeStop(i: number) {
    this.stops.splice(i, 1);
  }

  save() {
    if (!this.form.routeId || !this.form.departureTime || !this.form.arrivalTime) return;

    this.svc.add({
      id: 0,
      routeId: this.form.routeId!,
      date: this.form.date!,
      departureTime: this.form.departureTime!,
      arrivalTime: this.form.arrivalTime!,
      stopsSchedule: this.stops,
      driver: this.form.driver || '',
      bus: this.form.bus || 0,
      status: this.form.status!,
      notes: this.form.notes
    });

    this.router.navigate(['/itinerary']);
  }
}
