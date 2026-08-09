package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.service.GalleryImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/gallery")
public class AdminGalleryController {

    private final GalleryImageService galleryImageService;

    public AdminGalleryController(GalleryImageService galleryImageService) {
        this.galleryImageService = galleryImageService;
    }

    @PostMapping
    public ResponseEntity<GalleryImageDto> uploadGalleryImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("caption") String caption) {
        try {
            GalleryImageDto uploadedImage = galleryImageService.uploadImage(file, caption);
            return new ResponseEntity<>(uploadedImage, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGalleryImage(@PathVariable UUID id) {
        try {
            galleryImageService.deleteGalleryImage(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}