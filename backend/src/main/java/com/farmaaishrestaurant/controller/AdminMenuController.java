package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.MenuItemCategory;
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
    public ResponseEntity<MenuItemDto> updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItemDto menuItemDto) {
        MenuItemDto updatedMenuItem = menuService.updateMenuItem(id, menuItemDto);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/categories")
    public ResponseEntity<MenuItemCategory> createMenuItemCategory(@Valid @RequestBody MenuItemCategory category) {
        MenuItemCategory createdCategory = menuService.createMenuItemCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<MenuItemCategory> updateMenuItemCategory(@PathVariable Long id, @Valid @RequestBody MenuItemCategory category) {
        MenuItemCategory updatedCategory = menuService.updateMenuItemCategory(id, category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteMenuItemCategory(@PathVariable Long id) {
        menuService.deleteMenuItemCategory(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleIllegalArgumentException(IllegalArgumentException ex) {
        return ex.getMessage();
    }
}