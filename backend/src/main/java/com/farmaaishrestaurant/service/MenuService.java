package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateMenuItemRequest;
import com.farmaaishrestaurant.dto.MenuItemCategoryDto;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.MenuItemCategoryRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;

    public MenuService(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
    }

    public List<MenuItemDto> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(this::convertToMenuItemDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(UUID id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return convertToMenuItemDto(menuItem);
    }

    public List<MenuItemDto> getMenuItemsByCategoryId(UUID categoryId) {
        return menuItemRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToMenuItemDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto createMenuItem(CreateMenuItemRequest request) {
        MenuItemCategory category = menuItemCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + request.getCategoryId()));

        MenuItem menuItem = new MenuItem(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getImageUrl(),
                request.getVegetarian(),
                request.getSpicy(),
                request.getAvailable(),
                category
        );
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToMenuItemDto(savedMenuItem);
    }

    public MenuItemDto updateMenuItem(UUID id, CreateMenuItemRequest request) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        MenuItemCategory category = menuItemCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + request.getCategoryId()));

        existingMenuItem.setName(request.getName());
        existingMenuItem.setDescription(request.getDescription());
        existingMenuItem.setPrice(request.getPrice());
        existingMenuItem.setImageUrl(request.getImageUrl());
        existingMenuItem.setVegetarian(request.getVegetarian());
        existingMenuItem.setSpicy(request.getSpicy());
        existingMenuItem.setAvailable(request.getAvailable());
        existingMenuItem.setCategory(category);

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToMenuItemDto(updatedMenuItem);
    }

    public void deleteMenuItem(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    public List<MenuItemCategoryDto> getAllMenuItemCategories() {
        return menuItemCategoryRepository.findAll().stream()
                .map(this::convertToMenuItemCategoryDto)
                .collect(Collectors.toList());
    }

    public MenuItemCategoryDto getMenuItemCategoryById(UUID id) {
        MenuItemCategory category = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));
        return convertToMenuItemCategoryDto(category);
    }

    public MenuItemCategoryDto createMenuItemCategory(MenuItemCategoryDto request) {
        MenuItemCategory category = new MenuItemCategory();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        MenuItemCategory savedCategory = menuItemCategoryRepository.save(category);
        return convertToMenuItemCategoryDto(savedCategory);
    }

    public MenuItemCategoryDto updateMenuItemCategory(UUID id, MenuItemCategoryDto request) {
        MenuItemCategory existingCategory = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));

        existingCategory.setName(request.getName());
        existingCategory.setDescription(request.getDescription());
        MenuItemCategory updatedCategory = menuItemCategoryRepository.save(existingCategory);
        return convertToMenuItemCategoryDto(updatedCategory);
    }

    public void deleteMenuItemCategory(UUID id) {
        MenuItemCategory category = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));

        List<MenuItem> associatedMenuItems = menuItemRepository.findByCategoryId(id);
        if (!associatedMenuItems.isEmpty()) {
            throw new IllegalStateException("Cannot delete category with associated menu items.");
        }
        menuItemCategoryRepository.deleteById(id);
    }

    private MenuItemDto convertToMenuItemDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .vegetarian(menuItem.isVegetarian())
                .spicy(menuItem.isSpicy())
                .available(menuItem.isAvailable())
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .build();
    }

    private MenuItemCategoryDto convertToMenuItemCategoryDto(MenuItemCategory category) {
        return MenuItemCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }
}