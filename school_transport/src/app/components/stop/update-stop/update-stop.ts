import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { StopService } from '../../services/stop.service';
import { stopI } from '../../models/stop.models';

@Component({
  selector: 'app-update-stop',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-stop.html'
})
export class UpdateStop implements OnInit {
  form!: stopI;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private svc: StopService
  ) {}

  ngOnInit(): void {
    const id = Number(this.ar.snapshot.paramMap.get('id'));
    const found = this.svc.getById(id);
    if (!found) {
      alert('Parada no encontrada');
      this.router.navigate(['/stops']);
      return;
    }
    // clon para no mutar el store directamente
    this.form = { ...found };
  }

  save() {
    if (!this.form.name?.trim() || !this.form.direction?.trim()) {
      alert('Completa: Nombre y Dirección');
      return;
    }
    this.form.updatedAt = new Date();
    this.svc.update(this.form);
    this.router.navigate(['/parada']);
  }

  cancel() {
    this.router.navigate(['/parada']);
  }
}
