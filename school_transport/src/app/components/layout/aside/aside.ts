import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface CustomMenuItem {
  label: string;
  icon?: string;
  expanded?: boolean;
  routerLink?: string | any[];
  items?: CustomMenuItem[];
}

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.html'   
})
export class Aside implements OnInit {
  items: CustomMenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Rutas',
        icon: 'pi pi-map',
        items: [
          { label: 'Listado rutas', icon: 'pi pi-list', routerLink: ['/routes'] },
          { label: 'Crear rutas',   icon: 'pi pi-pencil', routerLink: ['/routes/add'] }
        ]
      },
      {
        label: 'Itinerarios',
        icon: 'pi pi-calendar',
        items: [
          { label: 'Mostrar itinerarios', icon: 'pi pi-list', routerLink: ['/itinerary'] },
          { label: 'Crear itinerario',    icon: 'pi pi-plus', routerLink: ['/itinerary/add'] }
        ]
      },
      {
        label: 'Estudiantes',
        icon: 'pi pi-users',
        items: [
          { label: 'Listado',   icon: 'pi pi-list',      routerLink: ['/student'] },
          { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: ['/student/add'] }
        ]
      },
      {
        label: 'Acudientes',
        icon: 'pi pi-id-card',
        items: [
          { label: 'Listado',   icon: 'pi pi-list',      routerLink: ['/guardian'] },
          { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: ['/guardian/add'] }
        ]
      },
      {
        label: 'Formulario',
        icon: 'pi pi-file-edit',
        items: [
          { label: 'Ver inscripciones', icon: 'pi pi-file-edit', routerLink: ['/assistance'] },
          { label: 'Inscriibirse', icon: 'pi pi-list', routerLink: ['/assistance/add'] }
        ]
      },
      {
        label: 'Buses',
        icon: 'pi pi-car',
        items: [
          { label: 'Buses', icon: 'pi pi-users', routerLink: ['/bus'] },
          { label: 'Añadir bus', icon: 'pi pi-users', routerLink: ['/bus/add'] },
          { label: 'Incidencias', icon: 'pi pi-info-circle', routerLink: ['/incidence'] }
        ]
      },
      {
        label: 'Paradas',
        icon: 'pi pi-map-marker',
        items: [
          { label: 'Parada', icon: 'pi pi-map-marker', routerLink: ['/parada'] },
          { label: 'Crear parada', icon: 'pi pi-th-large', routerLink: ['/parada/add'] }
        ]
      },
      {
        label: 'Conductor',
        icon: 'pi pi-gauge',
        items: [
          { label: 'Conductor', icon: 'pi pi-gauge', routerLink: ['/driver'] },
          { label: 'Crear conductor', icon: 'pi pi-th-large', routerLink: ['/driver/add'] }
        ]
      },
      {
        label: 'Asignacion de rutas',
        icon: 'pi pi-gauge',
        items: [
          { label: 'Ver asignaciones', icon: 'pi pi-gauge', routerLink: ['/route-assignment'] },
          { label: 'Crear asignacion', icon: 'pi pi-th-large', routerLink: ['/route-assignment/add'] }
        ]
      },
      {
        label: 'Mantenimiento Bus',
        icon: 'pi pi-cog',
        items: [
          { label: 'Mantenimientos', icon: 'pi pi-cog', routerLink: ['/mantenimiento'] },
          { label: 'Añadir mantenimiento', icon: 'pi pi-users', routerLink: ['/mantenimiento/add'] }
        ]
      }
    ];
  }

  // Abre/cierra submenú; si no tiene hijos, navega
  toggleSubmenu(item: CustomMenuItem) {
    if (item.items?.length) {
      // modo acordeón: cierra otros grupos de primer nivel
      for (const it of this.items) {
        if (it !== item) it.expanded = false;
      }
      item.expanded = !item.expanded;
    } else if (item.routerLink) {
      this.router.navigate(Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink]);
    }
  }

  // activo para enlaces hoja (opcional)
  isActive(link?: string | any[]) {
    if (!link) return false;
    const url = this.router.url.replace(/^\//, '');
    const target = Array.isArray(link) ? link.join('/') : String(link).replace(/^\//, '');
    return url === target || url.startsWith(target + '/');
  }

  trackByLabel = (_: number, it: CustomMenuItem) => it.label;
}