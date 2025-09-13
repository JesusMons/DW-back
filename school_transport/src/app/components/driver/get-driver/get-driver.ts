import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';

// Servicios / modelos
import { DriverService } from '../../services/driver.service';
import { BusService } from '../../services/bus.service';
import { driverI } from '../../models/driver.models';
import { busI } from '../../models/bus.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-dataview',
  standalone: true,
  templateUrl: './get-driver.html',
  imports: [CommonModule, RouterModule, DataView, ButtonModule, Tag, SelectModule, DialogModule, FormsModule],
})
export class GetDriver {
  // datos
  drivers = signal<driverI[]>([]);

  // soporte UI
  sortOptions = [
    { label: 'Nombre A → Z', value: 'name' },
    { label: 'Nombre Z → A', value: '!name' },
    { label: 'Experiencia ↑', value: 'experienceYears' },
    { label: 'Experiencia ↓', value: '!experienceYears' },
    { label: 'Estado', value: 'status' },
  ];
  sortKey!: string;
  sortOrder: number = 1;
  sortField: string = 'name';

  // modal detalle
  detailsVisible = false;
  selected?: driverI & { busPlate?: string };

  private buses: busI[] = [];

  constructor(private driverSvc: DriverService, private busSvc: BusService) {}

  ngOnInit() {
    // cargar buses (para mostrar placa si tiene assignedBusId)
    this.buses = this.busSvc.getAll?.() ?? [];

    // cargar conductores
    const data = this.driverSvc.getAll();
    this.drivers.set(data);
  }

  onSortChange(event: any) {
    const value: string = event.value;
    if (value.startsWith('!')) {
      this.sortOrder = -1;
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getSeverity(d: driverI) {
    switch (d.status) {
      case 'ACTIVO':
        return 'success';
      case 'SUSPENDIDO':
        return 'warning';
      default:
        return 'danger';
    }
  }

  getBusPlate(id?: number) {
    if (!id) return undefined;
    return this.buses.find(b => b.id === id)?.plate;
  }

  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src = '/drivers/default.jpg';
  }

  showDetails(d: driverI) {
    this.selected = { ...d, busPlate: this.getBusPlate(d.assignedBusId) };
    this.detailsVisible = true;
  }

  delete(id: number) {
    this.driverSvc.remove(id);
    this.drivers.set(this.driverSvc.getAll());
  }
}
