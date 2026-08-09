package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.GalleryImageDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.GalleryImage;
import com.farmaaishrestaurant.repository.GalleryImageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GalleryImageService {

    private final GalleryImageRepository galleryImageRepository;

    @Value("${upload.gallery.dir}")
    private String uploadDir;

    public GalleryImageService(GalleryImageRepository galleryImageRepository) {
        this.galleryImageRepository = galleryImageRepository;
    }

    public GalleryImageDto uploadImage(MultipartFile file, String caption) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath);

        String imageUrl = "/uploads/gallery/" + uniqueFilename;

        GalleryImage galleryImage = new GalleryImage(imageUrl, caption, LocalDateTime.now());
        galleryImage = galleryImageRepository.save(galleryImage);

        return GalleryImageDto.builder()
                .id(galleryImage.getId())
                .imageUrl(galleryImage.getImageUrl())
                .caption(galleryImage.getCaption())
                .uploadDate(galleryImage.getUploadDate())
                .build();
    }

    public List<GalleryImageDto> getAllGalleryImages() {
        return galleryImageRepository.findAll().stream()
                .map(image -> GalleryImageDto.builder()
                        .id(image.getId())
                        .imageUrl(image.getImageUrl())
                        .caption(image.getCaption())
                        .uploadDate(image.getUploadDate())
                        .build())
                .collect(Collectors.toList());
    }

    public GalleryImageDto getGalleryImageById(UUID id) {
        GalleryImage galleryImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));

        return GalleryImageDto.builder()
                .id(galleryImage.getId())
                .imageUrl(galleryImage.getImageUrl())
                .caption(galleryImage.getCaption())
                .uploadDate(galleryImage.getUploadDate())
                .build();
    }

    public void deleteGalleryImage(UUID id) throws IOException {
        GalleryImage galleryImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));

        String imageUrl = galleryImage.getImageUrl();
        if (imageUrl != null && imageUrl.startsWith("/uploads/gallery/")) {
            String filename = imageUrl.substring("/uploads/gallery/".length());
            Path filePath = Paths.get(uploadDir).resolve(filename);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        }
        galleryImageRepository.delete(galleryImage);
    }
}