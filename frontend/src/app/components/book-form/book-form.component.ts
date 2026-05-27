import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px;">
      <div style="margin-bottom: 2rem;">
        <a [routerLink]="['/authors', authorId]" style="color: var(--text-secondary); text-decoration: none;">&larr; Volver a Detalles del Autor</a>
      </div>

      <div class="glass-panel">
        <h1 style="margin-bottom: 2rem;">Añadir Nuevo Libro</h1>

        <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="title">Título del Libro</label>
            <input 
              id="title" 
              type="text" 
              class="form-control" 
              formControlName="title" 
              placeholder="ej. Harry Potter y la Piedra Filosofal"
            >
            <div *ngIf="bookForm.get('title')?.invalid && bookForm.get('title')?.touched" style="color: var(--danger); font-size: 0.85rem; margin-top: 0.5rem;">
              El título es obligatorio.
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="publishedYear">Año de Publicación</label>
            <input 
              id="publishedYear" 
              type="number" 
              class="form-control" 
              formControlName="publishedYear" 
              placeholder="ej. 1997"
            >
            <div *ngIf="bookForm.get('publishedYear')?.invalid && bookForm.get('publishedYear')?.touched" style="color: var(--danger); font-size: 0.85rem; margin-top: 0.5rem;">
              Por favor, introduce un año válido.
            </div>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button type="button" class="btn btn-secondary" [routerLink]="['/authors', authorId]">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="bookForm.invalid || submitting">
              {{ submitting ? 'Guardando...' : 'Guardar Libro' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  submitting = false;
  authorId: number = 0;

  bookForm = this.fb.group({
    title: ['', Validators.required],
    publishedYear: [null, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
    authorId: [0, Validators.required]
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('authorId');
    if (idParam) {
      this.authorId = parseInt(idParam, 10);
      this.bookForm.patchValue({ authorId: this.authorId });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.submitting = true;
      this.apiService.createBook(this.bookForm.value as any).subscribe({
        next: () => {
          this.router.navigate(['/authors', this.authorId]);
        },
        error: (err) => {
          console.error('Error creating book', err);
          this.submitting = false;
        }
      });
    }
  }
}
