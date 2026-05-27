import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px;">
      <div style="margin-bottom: 2rem;">
        <a routerLink="/" style="color: var(--text-secondary); text-decoration: none;">&larr; Volver a Autores</a>
      </div>

      <div class="glass-panel">
        <h1 style="margin-bottom: 2rem;">Añadir Nuevo Autor</h1>

        <form [formGroup]="authorForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="name">Nombre del Autor</label>
            <input 
              id="name" 
              type="text" 
              class="form-control" 
              formControlName="name" 
              placeholder="ej. J.K. Rowling"
            >
            <div *ngIf="authorForm.get('name')?.invalid && authorForm.get('name')?.touched" style="color: var(--danger); font-size: 0.85rem; margin-top: 0.5rem;">
              El nombre es obligatorio.
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="birthYear">Año de Nacimiento</label>
            <input 
              id="birthYear" 
              type="number" 
              class="form-control" 
              formControlName="birthYear" 
              placeholder="ej. 1965"
            >
            <div *ngIf="authorForm.get('birthYear')?.invalid && authorForm.get('birthYear')?.touched" style="color: var(--danger); font-size: 0.85rem; margin-top: 0.5rem;">
              Por favor, introduce un año válido.
            </div>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button type="button" class="btn btn-secondary" routerLink="/">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="authorForm.invalid || submitting">
              {{ submitting ? 'Guardando...' : 'Guardar Autor' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AuthorFormComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  submitting = false;

  authorForm = this.fb.group({
    name: ['', Validators.required],
    birthYear: [null, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]]
  });

  onSubmit() {
    if (this.authorForm.valid) {
      this.submitting = true;
      this.apiService.createAuthor(this.authorForm.value as any).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating author', err);
          this.submitting = false;
        }
      });
    }
  }
}
