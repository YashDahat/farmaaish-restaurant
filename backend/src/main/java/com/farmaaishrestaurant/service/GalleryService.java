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
public class GalleryService {

    private final GalleryImageRepository galleryImageRepository;

    public GalleryService(GalleryImageRepository galleryImageRepository) {
        this.galleryImageRepository = galleryImageRepository;
    }

    public List<GalleryImageDto> getAllGalleryImages() {
        return galleryImageRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public GalleryImageDto uploadGalleryImage(GalleryImageDto galleryImageDto) {
        GalleryImage galleryImage = convertToEntity(galleryImageDto);
        galleryImage.setUploadedAt(LocalDateTime.now());
        GalleryImage savedImage = galleryImageRepository.save(galleryImage);
        return convertToDto(savedImage);
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
                .uploadedAt(galleryImage.getUploadedAt())
                .build();
    }

    private GalleryImage convertToEntity(GalleryImageDto galleryImageDto) {
        return new GalleryImage(
                galleryImageDto.getImageUrl(),
                galleryImageDto.getCaption(),
                galleryImageDto.getUploadedAt()
        );
    }
}