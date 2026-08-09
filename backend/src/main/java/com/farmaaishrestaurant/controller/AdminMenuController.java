package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.MenuCategoryDto;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/menu")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMenuController {

    private final MenuService menuService;

    public AdminMenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<MenuCategoryDto>> getAllMenuCategories() {
        List<MenuCategoryDto> categories = menuService.getAllMenuCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<MenuCategoryDto> getMenuCategoryById(@PathVariable UUID categoryId) {
        MenuCategoryDto category = menuService.getMenuCategoryById(categoryId);
        return ResponseEntity.ok(category);
    }

    @PostMapping("/categories")
    public ResponseEntity<MenuCategoryDto> createMenuCategory(@RequestBody MenuCategoryDto categoryDto) {
        MenuCategoryDto createdCategory = menuService.createMenuCategory(categoryDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<MenuCategoryDto> updateMenuCategory(@PathVariable UUID categoryId, @RequestBody MenuCategoryDto categoryDto) {
        MenuCategoryDto updatedCategory = menuService.updateMenuCategory(categoryId, categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<Void> deleteMenuCategory(@PathVariable UUID categoryId) {
        menuService.deleteMenuCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/items")
    public ResponseEntity<List<MenuItemDto>> getAllMenuItems() {
        List<MenuItemDto> menuItems = menuService.getAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/items/{itemId}")
    public ResponseEntity<MenuItemDto> getMenuItemById(@PathVariable UUID itemId) {
        MenuItemDto menuItem = menuService.getMenuItemById(itemId);
        return ResponseEntity.ok(menuItem);
    }

    @PostMapping("/items")
    public ResponseEntity<MenuItemDto> createMenuItem(@RequestBody MenuItemDto menuItemDto) {
        MenuItemDto createdMenuItem = menuService.createMenuItem(menuItemDto);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<MenuItemDto> updateMenuItem(@PathVariable UUID itemId, @RequestBody MenuItemDto menuItemDto) {
        MenuItemDto updatedMenuItem = menuService.updateMenuItem(itemId, menuItemDto);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable UUID itemId) {
        menuService.deleteMenuItem(itemId);
        return ResponseEntity.noContent().build();
    }
}