import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { StopService } from '../../services/stop.service';
import { stopI } from '../../models/stop.models';

@Component({
  selector: 'app-add-stop',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-stop.html'
})
export class AddStop {
  form: Partial<stopI> = {
    name: '',
    direction: '',
    order: undefined,
    landmark: '',
    status: 'ACTIVA'
  };

  constructor(private svc: StopService, private router: Router) {}

  save() {
    if (!this.form.name || !this.form.direction) {
      alert('Completa: Nombre y Dirección');
      return;
    }

    const payload: stopI = {
      id: 0,
      name: this.form.name!.trim(),
      direction: this.form.direction!.trim(),
      order: this.form.order ? Number(this.form.order) : undefined,
      landmark: this.form.landmark?.trim(),
      status: (this.form.status as any) || 'ACTIVA',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.svc.add(payload);
    this.router.navigate(['/parada']);
  }

  cancel() {
    this.router.navigate(['/parada']);
  }
}
