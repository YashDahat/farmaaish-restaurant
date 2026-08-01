package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.service.GalleryImageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/gallery")
public class AdminGalleryController {

    private final GalleryImageService galleryImageService;

    public AdminGalleryController(GalleryImageService galleryImageService) {
        this.galleryImageService = galleryImageService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryImageDto>> getAllGalleryImages() {
        List<GalleryImageDto> galleryImages = galleryImageService.getAllGalleryImages();
        return ResponseEntity.ok(galleryImages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryImageDto> getGalleryImageById(@PathVariable UUID id) {
        try {
            GalleryImageDto galleryImage = galleryImageService.getGalleryImageById(id);
            return ResponseEntity.ok(galleryImage);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<GalleryImageDto> createGalleryImage(@Valid @RequestBody GalleryImageDto galleryImageDto) {
        try {
            GalleryImageDto createdImage = galleryImageService.createGalleryImage(galleryImageDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdImage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryImageDto> updateGalleryImage(@PathVariable UUID id, @Valid @RequestBody GalleryImageDto galleryImageDto) {
        try {
            GalleryImageDto updatedImage = galleryImageService.updateGalleryImage(id, galleryImageDto);
            return ResponseEntity.ok(updatedImage);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryImage(@PathVariable UUID id) {
        try {
            galleryImageService.deleteGalleryImage(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}