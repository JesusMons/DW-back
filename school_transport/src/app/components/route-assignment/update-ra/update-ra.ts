import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { RouteAssignmentService } from '../../services/route-assignment.service';
import { RoutesService } from '../../services/routes.service';
import { BusService } from '../../services/bus.service';
import { DriverService } from '../../services/driver.service';

import { route_assignment } from '../../models/route-assignment.models';
import { RouteI } from '../../models/routes.models';
import { busI } from '../../models/bus.models';
import { driverI } from '../../models/driver.models';

@Component({
  selector: 'app-update-ra',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-ra.html'
})
export class UpdateRA implements OnInit {
  form!: route_assignment;

  routes: RouteI[] = [];
  buses: busI[] = [];
  drivers: driverI[] = [];

  // helpers para <input type="date">
  startInput = '';
  endInput = '';

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private raSvc: RouteAssignmentService,
    private routeSvc: RoutesService,
    private busSvc: BusService,
    private driverSvc: DriverService
  ) {}

  ngOnInit(): void {
    // catálogos
    this.routes  = (this.routeSvc as any).getAll?.() ?? this.routeSvc.getRoutes?.() ?? [];
    this.buses   = (this.busSvc  as any).getAll?.() ?? [];
    this.drivers = (this.driverSvc as any).getAll?.() ?? [];

    // id desde la ruta
    const raw = this.ar.snapshot.paramMap.get('id');
    const id = raw !== null ? Number(raw) : NaN;
    if (Number.isNaN(id)) {
      alert('Ruta inválida: id no es un número');
      this.router.navigate(['/ra']);
      return;
    }

    const found = this.raSvc.getById(id);
    if (!found) {
      alert('Asignación no encontrada');
      this.router.navigate(['/ra']);
      return;
    }

    // clonar para no mutar el store
    this.form = { ...found };

    // setear inputs de fecha
    this.startInput = this.form.startDate
      ? new Date(this.form.startDate).toISOString().slice(0, 10)
      : '';
    this.endInput = this.form.endDate
      ? new Date(this.form.endDate).toISOString().slice(0, 10)
      : '';
  }

  onStartChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.startInput = v;
    this.form.startDate = v ? new Date(v) : (this.form.startDate as any);
  }

  onEndChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.endInput = v;
    this.form.endDate = v ? new Date(v) : undefined;
  }

  save() {
    if (!this.form.routeId || !this.form.busId || !this.startInput) {
      alert('Completa: Ruta, Bus y Fecha de inicio.');
      return;
    }

    // normalizar fechas desde inputs
    this.form.startDate = new Date(this.startInput);
    this.form.endDate   = this.endInput ? new Date(this.endInput) : undefined;

    this.form.updatedAt = new Date();
    this.raSvc.update(this.form);
    this.router.navigate(['/route-assignment']);
  }

  cancel() {
    this.router.navigate(['/route-assignment']);
  }
}
