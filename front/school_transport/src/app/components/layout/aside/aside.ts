import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, CommonModule],
  templateUrl: './aside.html',
  styleUrls: ['./aside.css']
})
export class Aside implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Rutas',
        icon: 'pi pi-fw pi-map',
        smallText: 'sweet home',
        url: '#'
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        smallText: 'know us better',
        url: '#',
        command: () => this.setActive(this.items![1]) // Marcar como activo al click
      },
      {
        label: 'Features',
        icon: 'gift',
        smallText: 'our services',
        url: '#'
      },
      {
        label: 'News',
        icon: 'globe',
        smallText: 'latest updates',
        url: '#'
      },
      {
        label: 'Buses',
        icon: 'pi pi-car',
        smallText: 'what they say',
        items: [
          {
            label: 'Mantenimiento',
            icon: 'pi pi-wrench',
            url: '#'
          },
          {
            label: 'Conductores',
            icon: 'users',
            items: [
              {
                label: 'Leyla Sparks',
                icon: 'user',
                url: '#'
              },
              {
                label: 'Gleb Ismailov',
                icon: 'user',
                items: [
                  {
                    label: 'About',
                    icon: 'info-circle',
                    url: '#'
                  },
                  {
                    label: 'Skills',
                    icon: 'check-circle',
                    url: '#'
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    this.activeItem = this.items[1]; // "About us" como activo por defecto
  }

  setActive(item: MenuItem) {
    this.activeItem = item;
  }
}