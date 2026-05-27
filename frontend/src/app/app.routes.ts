import { Routes } from '@angular/router';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { BookFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
  { path: '', component: AuthorListComponent },
  { path: 'authors/new', component: AuthorFormComponent },
  { path: 'authors/:id', component: AuthorDetailComponent },
  { path: 'authors/:authorId/books/new', component: BookFormComponent },
  { path: '**', redirectTo: '' }
];
