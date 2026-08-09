package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.MenuCategoryDto;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
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
}