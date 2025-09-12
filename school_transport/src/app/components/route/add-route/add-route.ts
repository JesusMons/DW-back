import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesService } from '../../services/routes.service';
import { RouteI } from '../../models/routes.models';

// PrimeNG
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-route',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBar, ToastModule],
  templateUrl: './add-route.html',
  providers: [MessageService]
})
export class AddRoute {
  // Modelo temporal
  newRoute: Partial<RouteI> = { name: '', startPoint: '', endPoint: '', bus: 0, driver: '', status: 'ACTIVE' };
  stopsInput = '';
  scheduleInput = '';

  // Barra de progreso
  value = 0;
  loading = false;
  interval: any;

  stops: string[] = [];
  schedules: string[] = [];


  constructor(
    private routeService: RoutesService,
    private router: Router,
    private messageService: MessageService,
    private ngZone: NgZone
  ) { }

  addRoute() {
    if (!this.newRoute.name || !this.newRoute.startPoint || !this.newRoute.endPoint) {
      this.messageService.add({ severity: 'warn', summary: 'Campos faltantes', detail: 'Completa todos los obligatorios.' });
      return;
    }

    const route: RouteI = {
      id: 0,
      name: this.newRoute.name!,
      stops: this.stops,
      startPoint: this.newRoute.startPoint!,
      endPoint: this.newRoute.endPoint!,
      schedule: this.schedules,
      bus: this.newRoute.bus!,
      driver: this.newRoute.driver!,
      status: this.newRoute.status!,
      createdAt: new Date(),
      updatedAt: new Date()
    };


    // 🔹 activar barra de carga
    this.loading = true;
    this.value = 0;

    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.value += Math.floor(Math.random() * 15) + 5; // avanza un poco aleatorio
          if (this.value >= 100) {
            this.value = 100;
            clearInterval(this.interval);
            this.loading = false;

            this.messageService.add({ severity: 'success', summary: 'Ruta creada', detail: `"${route.name}" fue agregada con éxito ✅` });
            this.routeService.addRoute(route);
            this.router.navigate(['/routes']);
          }
        });
      }, 400); // cada 0.4 seg
    });
  }

  addStop() {
    if (this.stopsInput.trim()) {
      this.stops.push(this.stopsInput.trim());
      this.stopsInput = '';
    }
  }

  addSchedule() {
    if (this.scheduleInput.trim()) {
      this.schedules.push(this.scheduleInput.trim());
      this.scheduleInput = '';
    }
  }
}
