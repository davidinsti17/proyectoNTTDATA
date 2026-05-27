import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Autores de la Biblioteca</h1>
        <a routerLink="/authors/new" class="btn btn-primary">Añadir Nuevo Autor</a>
      </div>

      <div *ngIf="loading()" style="text-align: center; padding: 2rem;">
        <p>Cargando autores...</p>
      </div>

      <div *ngIf="!loading() && authors().length === 0" class="glass-panel" style="text-align: center;">
        <p>No se encontraron autores. ¡Añade uno para empezar!</p>
      </div>

      <div class="card-grid" *ngIf="!loading() && authors().length > 0">
        <div class="card" *ngFor="let author of authors()" [routerLink]="['/authors', author.id]">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h3>{{ author.name }}</h3>
            <button 
              class="btn btn-danger" 
              style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" 
              (click)="deleteAuthor($event, author.id!)">
              Eliminar
            </button>
          </div>
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            Nacido en: {{ author.birthYear }}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <span style="font-size: 0.9rem; background: rgba(59, 130, 246, 0.2); padding: 0.25rem 0.5rem; border-radius: 4px; color: var(--primary);">
              {{ author.books?.length || 0 }} Libros
            </span>
            <span style="color: var(--accent); font-size: 0.9rem;">Ver detalles &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthorListComponent implements OnInit {
  private apiService = inject(ApiService);
  
  // Using Signals for state management
  authors = signal<Author[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.loading.set(true);
    this.apiService.getAuthors().subscribe({
      next: (data) => {
        this.authors.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching authors', err);
        this.loading.set(false);
      }
    });
  }

  deleteAuthor(event: Event, id: number) {
    event.stopPropagation(); // Prevent routing to details
    if (confirm('¿Estás seguro de que quieres eliminar este autor y todos sus libros?')) {
      this.apiService.deleteAuthor(id).subscribe({
        next: () => {
          this.loadAuthors();
        },
        error: (err) => console.error('Error deleting author', err)
      });
    }
  }
}
