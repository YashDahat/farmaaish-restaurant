package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    @Autowired
    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryItemDto>> getAllGalleryItems() {
        List<GalleryItemDto> galleryItems = galleryService.getAllGalleryItems();
        return ResponseEntity.ok(galleryItems);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<GalleryItemDto>> getGalleryItemsByCategory(@PathVariable String category) {
        try {
            List<GalleryItemDto> galleryItems = galleryService.getGalleryItemsByCategory(category);
            return ResponseEntity.ok(galleryItems);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryItemDto> getGalleryItemById(@PathVariable UUID id) {
        try {
            GalleryItemDto galleryItem = galleryService.getGalleryItemById(id);
            return ResponseEntity.ok(galleryItem);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}