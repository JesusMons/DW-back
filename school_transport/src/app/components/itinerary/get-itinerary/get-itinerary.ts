import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ItineraryService  } from '../../services/itinerary.service';
import { ItineraryI } from '../../models/itinerary.models';


@Component({
  selector: 'app-get-itinerary',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, DialogModule],
  templateUrl: './get-itinerary.html'
})
export class GetItinerary {
  itineraries: ItineraryI[] = [];
  detailsVisible = false;
  selectedItinerary?: ItineraryI;

  constructor(private svc: ItineraryService) {
    this.itineraries = this.svc.getAll();
  }

  delete(id: number) {
    this.svc.remove(id);
    this.itineraries = this.svc.getAll();
  }

  showDetails(it: ItineraryI) {
    this.selectedItinerary = it;
    this.detailsVisible = true;
  }
}
