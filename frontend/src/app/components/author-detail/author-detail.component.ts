import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div style="margin-bottom: 2rem;">
        <a routerLink="/" style="color: var(--text-secondary); text-decoration: none;">&larr; Volver a Autores</a>
      </div>

      <div *ngIf="loading()" style="text-align: center; padding: 2rem;">
        <p>Cargando detalles...</p>
      </div>

      <div *ngIf="author() as a" class="glass-panel">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
          <div>
            <h1 style="margin-bottom: 0.5rem;">{{ a.name }}</h1>
            <p style="color: var(--text-secondary);">Nacido en: {{ a.birthYear }}</p>
          </div>
          <a [routerLink]="['/authors', a.id, 'books', 'new']" class="btn btn-primary">Añadir Libro</a>
        </div>

        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
          Libros de este Autor ({{ a.books?.length || 0 }})
        </h2>

        <div *ngIf="!a.books || a.books.length === 0" style="padding: 2rem; text-align: center; background: rgba(0,0,0,0.2); border-radius: 8px;">
          <p>Este autor aún no tiene libros.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div *ngFor="let book of a.books" style="background: rgba(30, 41, 59, 0.6); padding: 1rem 1.5rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; color: var(--text-primary);">{{ book.title }}</h3>
              <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">Publicado: {{ book.publishedYear }}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
              <button 
                class="btn btn-danger" 
                style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" 
                (click)="deleteBook(book.id!)">
                Eliminar
              </button>
              <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(139, 92, 246, 0.2); display: flex; align-items: center; justify-content: center; color: var(--accent);">
                📚
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthorDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  
  author = signal<Author | null>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadAuthor(parseInt(idParam, 10));
    }
  }

  loadAuthor(id: number) {
    this.loading.set(true);
    this.apiService.getAuthorById(id).subscribe({
      next: (data) => {
        this.author.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching author details', err);
        this.loading.set(false);
      }
    });
  }

  deleteBook(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.apiService.deleteBook(id).subscribe({
        next: () => {
          // Reload author details to refresh the books list
          const currentAuthor = this.author();
          if (currentAuthor?.id) {
            this.loadAuthor(currentAuthor.id);
          }
        },
        error: (err) => console.error('Error deleting book', err)
      });
    }
  }
}
