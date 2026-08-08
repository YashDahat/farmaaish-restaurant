package com.farmaaishrestaurant.controller;

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
    public ResponseEntity<MenuItemDto> createMenuItem(@Valid @RequestBody MenuItemDto menuItemDto) {
        MenuItemDto createdMenuItem = menuService.createMenuItem(menuItemDto);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<MenuItemDto> updateMenuItem(@PathVariable UUID id, @Valid @RequestBody MenuItemDto menuItemDto) {
        MenuItemDto updatedMenuItem = menuService.updateMenuItem(id, menuItemDto);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable UUID id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/categories")
    public ResponseEntity<MenuItemCategoryDto> createMenuItemCategory(@Valid @RequestBody MenuItemCategoryDto categoryDto) {
        MenuItemCategoryDto createdCategory = menuService.createMenuItemCategory(categoryDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<MenuItemCategoryDto> updateMenuItemCategory(@PathVariable UUID id, @Valid @RequestBody MenuItemCategoryDto categoryDto) {
        MenuItemCategoryDto updatedCategory = menuService.updateMenuItemCategory(id, categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteMenuItemCategory(@PathVariable UUID id) {
        menuService.deleteMenuItemCategory(id);
        return ResponseEntity.noContent().build();
    }
}