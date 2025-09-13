import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-add-ra',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-ra.html'
})
export class AddRA {
  // catálogos
  routes: RouteI[] = [];
  buses: busI[] = [];
  drivers: driverI[] = [];

  // modelo del formulario
  form: Partial<route_assignment> = {
    routeId: undefined!,
    busId: undefined!,
    driverId: undefined,
    startDate: new Date(),
    endDate: undefined,
    status: 'ACTIVO'
  };

  // helpers para inputs date (yyyy-MM-dd)
  startInput = '';
  endInput = '';

  constructor(
    private raSvc: RouteAssignmentService,
    private routeSvc: RoutesService,
    private busSvc: BusService,
    private driverSvc: DriverService,
    private router: Router
  ) {
    // Cargar catálogos desde servicios in-memory
    this.routes  = (this.routeSvc as any).getAll?.() ?? this.routeSvc.getRoutes?.() ?? [];
    this.buses   = (this.busSvc  as any).getAll?.() ?? [];
    this.drivers = (this.driverSvc as any).getAll?.() ?? [];

    // Inicializar fechas (hoy)
    const today = new Date();
    this.startInput = today.toISOString().slice(0, 10); // yyyy-MM-dd
    this.form.startDate = new Date(this.startInput);
  }

  onStartChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.startInput = v;
    this.form.startDate = v ? new Date(v) : undefined;
  }

  onEndChange(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.endInput = v || '';
    this.form.endDate = v ? new Date(v) : undefined;
  }

  save() {
    if (!this.form.routeId || !this.form.busId || !this.form.startDate) {
      alert('Completa: Ruta, Bus y Fecha de inicio.');
      return;
    }

    // Política: si status es ACTIVO, usamos activateForRoute para cerrar la activa previa (si existe)
    if (this.form.status === 'ACTIVO') {
      this.raSvc.activateForRoute({
        routeId: Number(this.form.routeId),
        busId: Number(this.form.busId),
        driverId: this.form.driverId ? Number(this.form.driverId) : undefined,
        startDate: this.form.startDate!,
        endDate: this.form.endDate
      });
    } else {
      // Crear INACTIVO directo
      this.raSvc.add({
        id: 0,
        routeId: Number(this.form.routeId),
        busId: Number(this.form.busId),
        driverId: this.form.driverId ? Number(this.form.driverId) : undefined,
        startDate: this.form.startDate!,
        endDate: this.form.endDate,
        status: 'INACTIVO'
      });
    }

    this.router.navigate(['/route-assignment']);
  }

  cancel() {
    this.router.navigate(['/route-assignment']);
  }
}
