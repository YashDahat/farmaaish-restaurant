package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<MenuItemDto>> getAllMenuItems() {
        List<MenuItemDto> menuItems = menuService.getAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<MenuItemDto> getMenuItemById(@PathVariable UUID id) {
        MenuItemDto menuItem = menuService.getMenuItemById(id);
        return ResponseEntity.ok(menuItem);
    }

    @GetMapping("/items/category/{categoryId}")
    public ResponseEntity<List<MenuItemDto>> getMenuItemsByCategoryId(@PathVariable UUID categoryId) {
        List<MenuItemDto> menuItems = menuService.getMenuItemsByCategoryId(categoryId);
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<MenuItemCategory>> getAllMenuItemCategories() {
        List<MenuItemCategory> categories = menuService.getAllMenuItemCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<MenuItemCategory> getMenuItemCategoryById(@PathVariable UUID id) {
        MenuItemCategory category = menuService.getMenuItemCategoryById(id);
        return ResponseEntity.ok(category);
    }
}