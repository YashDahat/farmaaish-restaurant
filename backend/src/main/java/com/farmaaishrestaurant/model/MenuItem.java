package com.farmaaishrestaurant.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.UUID;
import com.farmaaishrestaurant.model.MenuItemCategory;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotNull
    @Size(max = 100)
    private String name;

    @NotNull
    @Size(max = 500)
    private String description;

    @NotNull
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Size(max = 255)
    private String imageUrl;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MenuItemCategory category;

    public MenuItem() {
    }

    public MenuItem(String name, String description, BigDecimal price, String imageUrl, MenuItemCategory category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MenuItemCategory getCategory() {
        return category;
    }

    public void setCategory(MenuItemCategory category) {
        this.category = category;
    }
}