package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.service.GalleryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/gallery")
public class AdminGalleryController {

    private final GalleryService galleryService;

    public AdminGalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping
    public ResponseEntity<GalleryImageDto> uploadGalleryImage(@RequestBody GalleryImageDto galleryImageDto) {
        GalleryImageDto createdImage = galleryService.uploadGalleryImage(galleryImageDto);
        return new ResponseEntity<>(createdImage, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryImage(@PathVariable UUID id) {
        galleryService.deleteGalleryImage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}