package com.library.model;

public record BookSummary(int bookId, String title, String author, String category, int availableCopies) {
}
