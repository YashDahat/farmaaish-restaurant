package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.service.GalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryImageDto>> getAllGalleryImages() {
        List<GalleryImageDto> images = galleryService.getAllGalleryImages();
        return ResponseEntity.ok(images);
    }
}