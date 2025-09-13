import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { DriverService } from '../../services/driver.service';
import { BusService } from '../../services/bus.service';
import { driverI } from '../../models/driver.models';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './update-driver.html'
})
export class UpdateDriver implements OnInit {
  form!: driverI;                // se llena al cargar por id
  buses: busI[] = [];            // opciones para select
  previewUrl = '/drivers/default.jpg';
  selectedFileName: string | null = null;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private driversSvc: DriverService,
    private busSvc: BusService
  ) {}

  ngOnInit(): void {
    this.buses = this.busSvc.getAll?.() ?? [];

    const raw = this.ar.snapshot.paramMap.get('id');
    const id = raw !== null ? Number(raw) : NaN;

    if (Number.isNaN(id)) {
      alert('Ruta inválida: id de conductor no es un número');
      this.router.navigate(['/driver']);
      return;
    }

    const found = this.driversSvc.getById(id);
    if (!found) {
      alert('Conductor no encontrado');
      this.router.navigate(['/driver']);
      return;
    }

    // Clonar para no mutar el store directamente
    this.form = { ...found };
    this.previewUrl = this.form.photoUrl || '/drivers/default.jpg';
  }

  onLicenceChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.form.licenceExpiry = el.value ? new Date(el.value) : undefined;
  }

  // Simulación de carga de foto: solo cambiamos la ruta y mostramos preview
  onPhotoChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFileName = file.name;
    this.previewUrl = URL.createObjectURL(file);
    // Nota: debes colocar manualmente el archivo en public/drivers/<file.name>
    this.form.photoUrl = `/drivers/${file.name}`;
  }

  save() {
    if (!this.form.name?.trim() || !this.form.type_licence?.trim()) {
      alert('Completa al menos: Nombre y Tipo de licencia.');
      return;
    }

    this.form.updatedAt = new Date();
    this.driversSvc.update(this.form);
    this.router.navigate(['/driver']);
  }

  cancel() {
    this.router.navigate(['/driver']);
  }
}
