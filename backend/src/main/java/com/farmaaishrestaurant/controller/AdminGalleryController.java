package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/gallery")
public class AdminGalleryController {

    private final GalleryService galleryService;

    @Autowired
    public AdminGalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping
    public ResponseEntity<GalleryItemDto> createGalleryItem(@RequestBody GalleryItemDto galleryItemDto) {
        GalleryItemDto createdItem = galleryService.createGalleryItem(galleryItemDto);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryItemDto> updateGalleryItem(@PathVariable UUID id, @RequestBody GalleryItemDto galleryItemDto) {
        try {
            GalleryItemDto updatedItem = galleryService.updateGalleryItem(id, galleryItemDto);
            return ResponseEntity.ok(updatedItem);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable UUID id) {
        try {
            galleryService.deleteGalleryItem(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}