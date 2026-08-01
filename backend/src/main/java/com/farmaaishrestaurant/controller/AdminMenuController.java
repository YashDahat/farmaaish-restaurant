package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateMenuItemRequest;
import com.farmaaishrestaurant.dto.MenuItemCategoryDto;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.service.MenuService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/menu")
public class AdminMenuController {

    private final MenuService menuService;

    public AdminMenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/items")
    public ResponseEntity<MenuItemDto> createMenuItem(@Valid @RequestBody CreateMenuItemRequest request) {
        MenuItemDto createdMenuItem = menuService.createMenuItem(request);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<MenuItemDto> updateMenuItem(@PathVariable UUID id, @Valid @RequestBody CreateMenuItemRequest request) {
        MenuItemDto updatedMenuItem = menuService.updateMenuItem(id, request);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable UUID id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/categories")
    public ResponseEntity<MenuItemCategoryDto> createMenuItemCategory(@Valid @RequestBody MenuItemCategoryDto request) {
        MenuItemCategoryDto createdCategory = menuService.createMenuItemCategory(request);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<MenuItemCategoryDto> updateMenuItemCategory(@PathVariable UUID id, @Valid @RequestBody MenuItemCategoryDto request) {
        MenuItemCategoryDto updatedCategory = menuService.updateMenuItemCategory(id, request);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteMenuItemCategory(@PathVariable UUID id) {
        menuService.deleteMenuItemCategory(id);
        return ResponseEntity.noContent().build();
    }
}