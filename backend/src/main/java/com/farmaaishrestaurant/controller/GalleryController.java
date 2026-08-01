package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.service.GalleryImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gallery")
public class GalleryController {

    private final GalleryImageService galleryImageService;

    public GalleryController(GalleryImageService galleryImageService) {
        this.galleryImageService = galleryImageService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryImageDto>> getAllGalleryImages() {
        List<GalleryImageDto> galleryImages = galleryImageService.getAllGalleryImages();
        return ResponseEntity.ok(galleryImages);
    }
}