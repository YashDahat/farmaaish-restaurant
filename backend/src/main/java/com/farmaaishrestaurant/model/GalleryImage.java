package com.farmaaishrestaurant.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String imageUrl;
    private String caption;
    private LocalDateTime uploadDate;

    public GalleryImage() {
    }

    public GalleryImage(String imageUrl, String caption, LocalDateTime uploadDate) {
        this.imageUrl = imageUrl;
        this.caption = caption;
        this.uploadDate = uploadDate;
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

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
}