package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.GalleryItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.GalleryItem;
import com.farmaaishrestaurant.repository.GalleryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GalleryService {

    private final GalleryItemRepository galleryItemRepository;

    @Autowired
    public GalleryService(GalleryItemRepository galleryItemRepository) {
        this.galleryItemRepository = galleryItemRepository;
    }

    public List<GalleryItemDto> getAllGalleryItems() {
        return galleryItemRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GalleryItemDto> getGalleryItemsByCategory(String category) {
        List<GalleryItem> items = galleryItemRepository.findByCategory(category);
        if (items.isEmpty()) {
            throw new ResourceNotFoundException("No gallery items found for category: " + category);
        }
        return items.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public GalleryItemDto getGalleryItemById(UUID id) {
        GalleryItem galleryItem = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        return convertToDto(galleryItem);
    }

    public GalleryItemDto createGalleryItem(GalleryItemDto galleryItemDto) {
        GalleryItem galleryItem = convertToEntity(galleryItemDto);
        galleryItem.setUploadDate(LocalDateTime.now());
        GalleryItem savedItem = galleryItemRepository.save(galleryItem);
        return convertToDto(savedItem);
    }

    public GalleryItemDto updateGalleryItem(UUID id, GalleryItemDto galleryItemDto) {
        GalleryItem existingItem = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));

        existingItem.setTitle(galleryItemDto.getTitle());
        existingItem.setDescription(galleryItemDto.getDescription());
        existingItem.setImageUrl(galleryItemDto.getImageUrl());
        existingItem.setCategory(galleryItemDto.getCategory());

        GalleryItem updatedItem = galleryItemRepository.save(existingItem);
        return convertToDto(updatedItem);
    }

    public void deleteGalleryItem(UUID id) {
        if (!galleryItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery item not found with id: " + id);
        }
        galleryItemRepository.deleteById(id);
    }

    private GalleryItemDto convertToDto(GalleryItem galleryItem) {
        return GalleryItemDto.builder()
                .id(galleryItem.getId())
                .title(galleryItem.getTitle())
                .description(galleryItem.getDescription())
                .imageUrl(galleryItem.getImageUrl())
                .category(galleryItem.getCategory())
                .uploadDate(galleryItem.getUploadDate())
                .build();
    }

    private GalleryItem convertToEntity(GalleryItemDto galleryItemDto) {
        GalleryItem galleryItem = new GalleryItem();
        galleryItem.setId(galleryItemDto.getId());
        galleryItem.setTitle(galleryItemDto.getTitle());
        galleryItem.setDescription(galleryItemDto.getDescription());
        galleryItem.setImageUrl(galleryItemDto.getImageUrl());
        galleryItem.setCategory(galleryItemDto.getCategory());
        galleryItem.setUploadDate(galleryItemDto.getUploadDate()); // Will be overwritten by create method
        return galleryItem;
    }
}