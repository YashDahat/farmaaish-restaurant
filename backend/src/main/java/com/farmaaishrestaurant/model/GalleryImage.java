package com.farmaaishrestaurant.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "gallery_images")
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(length = 255)
    private String caption;

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    public GalleryImage() {
    }

    public GalleryImage(String imageUrl, String caption, LocalDateTime uploadedAt) {
        this.imageUrl = imageUrl;
        this.caption = caption;
        this.uploadedAt = uploadedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}