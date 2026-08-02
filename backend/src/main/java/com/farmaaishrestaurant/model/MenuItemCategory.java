package com.farmaaishrestaurant.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "menu_item_categories")
public class MenuItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    public MenuItemCategory() {}

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
}
