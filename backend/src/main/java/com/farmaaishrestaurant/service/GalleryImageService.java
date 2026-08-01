package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.GalleryImage;
import com.farmaaishrestaurant.repository.GalleryImageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GalleryImageService {

    private final GalleryImageRepository galleryImageRepository;

    public GalleryImageService(GalleryImageRepository galleryImageRepository) {
        this.galleryImageRepository = galleryImageRepository;
    }

    public List<GalleryImageDto> getAllGalleryImages() {
        return galleryImageRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public GalleryImageDto getGalleryImageById(UUID id) {
        GalleryImage galleryImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));
        return convertToDto(galleryImage);
    }

    public GalleryImageDto createGalleryImage(GalleryImageDto galleryImageDto) {
        if (galleryImageDto.getImageUrl() == null || galleryImageDto.getImageUrl().isBlank()) {
            throw new IllegalArgumentException("Image URL cannot be null or empty.");
        }
        if (galleryImageDto.getDisplayOrder() == null || galleryImageDto.getDisplayOrder() < 0) {
            throw new IllegalArgumentException("Display order cannot be null or negative.");
        }

        if (galleryImageRepository.findAll().stream().anyMatch(img -> img.getImageUrl().equals(galleryImageDto.getImageUrl()))) {
            throw new IllegalArgumentException("Gallery image with the same URL already exists.");
        }
        if (galleryImageRepository.findAll().stream().anyMatch(img -> img.getDisplayOrder().equals(galleryImageDto.getDisplayOrder()))) {
            throw new IllegalArgumentException("Gallery image with the same display order already exists.");
        }

        GalleryImage galleryImage = convertToEntity(galleryImageDto);
        galleryImage.setCreatedAt(LocalDateTime.now());
        galleryImage.setUpdatedAt(LocalDateTime.now());
        GalleryImage savedImage = galleryImageRepository.save(galleryImage);
        return convertToDto(savedImage);
    }

    public GalleryImageDto updateGalleryImage(UUID id, GalleryImageDto galleryImageDto) {
        GalleryImage existingImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));

        if (galleryImageDto.getImageUrl() == null || galleryImageDto.getImageUrl().isBlank()) {
            throw new IllegalArgumentException("Image URL cannot be null or empty.");
        }
        if (galleryImageDto.getDisplayOrder() == null || galleryImageDto.getDisplayOrder() < 0) {
            throw new IllegalArgumentException("Display order cannot be null or negative.");
        }

        if (galleryImageRepository.findAll().stream()
                .filter(img -> !img.getId().equals(id))
                .anyMatch(img -> img.getImageUrl().equals(galleryImageDto.getImageUrl()))) {
            throw new IllegalArgumentException("Gallery image with the same URL already exists.");
        }
        if (galleryImageRepository.findAll().stream()
                .filter(img -> !img.getId().equals(id))
                .anyMatch(img -> img.getDisplayOrder().equals(galleryImageDto.getDisplayOrder()))) {
            throw new IllegalArgumentException("Gallery image with the same display order already exists.");
        }

        existingImage.setImageUrl(galleryImageDto.getImageUrl());
        existingImage.setCaption(galleryImageDto.getCaption());
        existingImage.setDisplayOrder(galleryImageDto.getDisplayOrder());
        existingImage.setUpdatedAt(LocalDateTime.now());

        GalleryImage updatedImage = galleryImageRepository.save(existingImage);
        return convertToDto(updatedImage);
    }

    public void deleteGalleryImage(UUID id) {
        if (!galleryImageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery image not found with id: " + id);
        }
        galleryImageRepository.deleteById(id);
    }

    private GalleryImageDto convertToDto(GalleryImage galleryImage) {
        return GalleryImageDto.builder()
                .id(galleryImage.getId())
                .imageUrl(galleryImage.getImageUrl())
                .caption(galleryImage.getCaption())
                .displayOrder(galleryImage.getDisplayOrder())
                .createdAt(galleryImage.getCreatedAt())
                .updatedAt(galleryImage.getUpdatedAt())
                .build();
    }

    private GalleryImage convertToEntity(GalleryImageDto galleryImageDto) {
        GalleryImage galleryImage = new GalleryImage();
        galleryImage.setId(galleryImageDto.getId());
        galleryImage.setImageUrl(galleryImageDto.getImageUrl());
        galleryImage.setCaption(galleryImageDto.getCaption());
        galleryImage.setDisplayOrder(galleryImageDto.getDisplayOrder());
        galleryImage.setCreatedAt(galleryImageDto.getCreatedAt());
        galleryImage.setUpdatedAt(galleryImageDto.getUpdatedAt());
        return galleryImage;
    }
}