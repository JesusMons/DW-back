import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface CustomMenuItem extends MenuItem {
  smallText?: string;
  expanded?: boolean;
  routerLink?: string | any[];
  items?: CustomMenuItem[];
}

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.html',
  styleUrls: ['./aside.css']
})
export class Aside implements OnInit {
  items: CustomMenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Rutas',
        icon: 'pi pi-map',
        items: [
          { label: 'Listado rutas', icon: 'pi pi-list', routerLink: ['/mostrar-rutas'] },
          { label: 'Crear rutas', icon: 'pi pi-pencil', routerLink: ['/crear-rutas'] }
        ]
      },
      {
        label: 'Itinerarios',
        icon: 'pi pi-calendar',
        items: [
          { label: 'Mostrar itinerarios', icon: 'pi pi-list', routerLink: ['/mostrar-itinerario'] },
          { label: 'Crear itinerario', icon: 'pi pi-plus', routerLink: ['/crear-itinerario'] }
        ]
      },
      {
        label: 'Estudiantes',
        icon: 'pi pi-users',
        items: [

          { label: 'Listado', icon: 'pi pi-list', routerLink: ['/estudiantes/listado'] },
          { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: ['/estudiantes/registrar'] },

        ]
      },
      {
        label: 'Acudientes', icon: 'pi pi-id-card', routerLink: ['/acudientes'], items: [
          { label: 'Listado', icon: 'pi pi-list', routerLink: ['/acudientes/listado'] },
          { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: ['/acudientes/registrar'] },

        ]
      },
      {
        label: 'Formulario', icon: 'pi pi-file-edit', items: [
          { label: 'Inscribirse', icon: 'pi pi-file-edit', routerLink: ['/formulario'] },
          { label: 'Ver inscripciones', icon: 'pi pi-list', routerLink: ['/listado-inscripciones'] }
        ]
      },

      { label: 'Buses', icon: 'pi pi-car', items: [
        {label: 'Conductores', icon: 'pi pi-list', routerLink: ['/bus/conductor']},
        {label: 'indicecias', icon: 'pi pi-info-circle', routerLink: ['/bus/incidentes']}
      ] } // Placeholder, puedes agregar subitems aquí si es necesario  
    ];

    // ❌ Nada abierto por defecto (NO pongas items[0].expanded = true)
  }

  toggleSubmenu(item: CustomMenuItem) {
    if (item.items?.length) {
      item.expanded = !item.expanded;
    } else if (item.routerLink) {
      this.router.navigate(Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink]);
    }
  }

  isActive(link?: string | any[]) {
    if (!link) return false;
    const url = this.router.url.replace(/^\//, '');
    const target = Array.isArray(link) ? link.join('/') : String(link).replace(/^\//, '');
    return url === target || url.startsWith(target + '/');
  }
}
