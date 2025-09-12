import { Component, OnInit } from '@angular/core';
import { TableModule, TableStyle } from 'primeng/table';
import { CommonModule } from '@angular/common';import { RouteI } from '../../models/routes.models';
import { RoutesService } from '../../services/routes.service';
import { Tag, TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-get-route',
  imports: [TableModule, CommonModule, Tag, ButtonModule, RouterModule],
  templateUrl: './get-route.html',
  styleUrl: './get-route.css'
})
export class GetRoute {

  routes: RouteI[] = [];

  constructor(private routesService: RoutesService){
    this.routesService.routes$.subscribe(routes =>{ this.routes = routes })
  }

  delete(id: number) {
    const ok = this.routesService.deleteRoute(id);
    if (!ok) {
      alert('La ruta no existe');
    }
  }

}
