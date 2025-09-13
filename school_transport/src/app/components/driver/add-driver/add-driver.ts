import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { DriverService } from '../../services/driver.service';
import { BusService } from '../../services/bus.service';
import { driverI } from '../../models/driver.models';
import { busI } from '../../models/bus.models';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-driver.html'
})
export class AddDriver {
  // formulario
  form: Partial<driverI> = {
    name: '',
    document: '',
    phone: '',
    email: '',
    address: '',
    type_licence: 'C2',
    licenceExpiry: undefined,
    experienceYears: 0,
    status: 'ACTIVO',
    assignedBusId: undefined,
    photoUrl: '/drivers/default.jpg'
  };

  // buses para el select
  buses: busI[] = [];

  // preview de imagen (solo UI)
  previewUrl: string = '/drivers/default.jpg';
  selectedFileName: string | null = null;

  constructor(
    private driversSvc: DriverService,
    private busSvc: BusService,
    private router: Router
  ) {
    this.buses = this.busSvc.getAll?.() ?? [];
  }

  // Nota: como no hay backend, solo tomamos el nombre del archivo para armar /drivers/<archivo>
  onPhotoChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFileName = file.name;
    // solo para ver preview en el formulario
    this.previewUrl = URL.createObjectURL(file);

    // ruta simulada (la imagen real debe existir en public/drivers/<file.name>)
    this.form.photoUrl = `/drivers/${file.name}`;
  }

  onLicenceChange(ev: Event) {
    const el = ev.target as HTMLInputElement;
    this.form.licenceExpiry = el.value ? new Date(el.value) : undefined;
  }

  save() {
    if (!this.form.name?.trim() || !this.form.type_licence?.trim()) {
      alert('Completa al menos: Nombre y Tipo de licencia.');
      return;
    }

    const payload: driverI = {
      id: 0,
      name: this.form.name!.trim(),
      document: this.form.document,
      phone: this.form.phone,
      email: this.form.email,
      address: this.form.address,
      type_licence: this.form.type_licence!,
      licenceExpiry: this.form.licenceExpiry ? new Date(this.form.licenceExpiry) : undefined,
      experienceYears: Number(this.form.experienceYears) || 0,
      status: (this.form.status as any) || 'ACTIVE',
      assignedBusId: this.form.assignedBusId ? Number(this.form.assignedBusId) : undefined,
      photoUrl: this.form.photoUrl || '/drivers/default.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.driversSvc.add(payload);

    // Aviso: si seleccionaste archivo, debes ponerlo manualmente en public/drivers/<nombre>
    // (no hay subida real en esta simulación)
    this.router.navigate(['/driver']);
  }

  cancel() {
    this.router.navigate(['/driver']);
  }
}
