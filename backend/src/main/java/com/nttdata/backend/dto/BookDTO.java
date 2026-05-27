package com.nttdata.backend.dto;

import lombok.Data;

@Data
public class BookDTO {
    private String title;
    private Integer publishedYear;
    private Long authorId;
}
