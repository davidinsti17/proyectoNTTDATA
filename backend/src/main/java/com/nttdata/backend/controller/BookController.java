package com.nttdata.backend.controller;

import com.nttdata.backend.dto.BookDTO;
import com.nttdata.backend.model.Author;
import com.nttdata.backend.model.Book;
import com.nttdata.backend.repository.AuthorRepository;
import com.nttdata.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody BookDTO bookDTO) {
        Optional<Author> authorOpt = authorRepository.findById(bookDTO.getAuthorId());
        if (!authorOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Autor no encontrado");
        }
        
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setPublishedYear(bookDTO.getPublishedYear());
        book.setAuthor(authorOpt.get());
        
        return ResponseEntity.ok(bookRepository.save(book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        if (!bookRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
