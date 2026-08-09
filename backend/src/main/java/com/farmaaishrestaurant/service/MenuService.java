package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.MenuCategoryDto;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.MenuCategory;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.repository.MenuCategoryRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final MenuCategoryRepository menuCategoryRepository;
    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuCategoryRepository menuCategoryRepository, MenuItemRepository menuItemRepository) {
        this.menuCategoryRepository = menuCategoryRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuCategoryDto> getAllMenuCategories() {
        List<com.farmaaishrestaurant.model.MenuCategory> categories = menuCategoryRepository.findAll();
        return categories.stream()
                .map(this::mapToMenuCategoryDto)
                .collect(Collectors.toList());
    }

    public MenuCategoryDto getMenuCategoryById(UUID categoryId) {
        com.farmaaishrestaurant.model.MenuCategory category = menuCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("MenuCategory not found with id: " + categoryId));
        return mapToMenuCategoryDto(category);
    }

    public List<MenuItemDto> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemRepository.findAll();
        return menuItems.stream()
                .map(this::mapToMenuItemDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(UUID itemId) {
        MenuItem menuItem = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem not found with id: " + itemId));
        return mapToMenuItemDto(menuItem);
    }

    @Transactional
    public MenuCategoryDto createMenuCategory(MenuCategoryDto categoryDto) {
        com.farmaaishrestaurant.model.MenuCategory category = new com.farmaaishrestaurant.model.MenuCategory();
        category.setName(categoryDto.getName());
        com.farmaaishrestaurant.model.MenuCategory savedCategory = menuCategoryRepository.save(category);
        return mapToMenuCategoryDto(savedCategory);
    }

    @Transactional
    public MenuCategoryDto updateMenuCategory(UUID categoryId, MenuCategoryDto categoryDto) {
        com.farmaaishrestaurant.model.MenuCategory existingCategory = menuCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("MenuCategory not found with id: " + categoryId));
        existingCategory.setName(categoryDto.getName());
        com.farmaaishrestaurant.model.MenuCategory updatedCategory = menuCategoryRepository.save(existingCategory);
        return mapToMenuCategoryDto(updatedCategory);
    }

    @Transactional
    public void deleteMenuCategory(UUID categoryId) {
        if (!menuCategoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("MenuCategory not found with id: " + categoryId);
        }
        menuCategoryRepository.deleteById(categoryId);
    }

    @Transactional
    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        com.farmaaishrestaurant.model.MenuCategory category = menuCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("MenuCategory not found with id: " + menuItemDto.getCategoryId()));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(menuItemDto.getName());
        menuItem.setDescription(menuItemDto.getDescription());
        menuItem.setPrice(menuItemDto.getPrice());
        menuItem.setImageUrl(menuItemDto.getImageUrl());
        menuItem.setVegetarian(menuItemDto.getIsVegetarian());
        menuItem.setAvailable(menuItemDto.getIsAvailable());
        menuItem.setCategory(category);

        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return mapToMenuItemDto(savedMenuItem);
    }

    @Transactional
    public MenuItemDto updateMenuItem(UUID itemId, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem not found with id: " + itemId));

        com.farmaaishrestaurant.model.MenuCategory category = menuCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("MenuCategory not found with id: " + menuItemDto.getCategoryId()));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setVegetarian(menuItemDto.getIsVegetarian());
        existingMenuItem.setAvailable(menuItemDto.getIsAvailable());
        existingMenuItem.setCategory(category);

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return mapToMenuItemDto(updatedMenuItem);
    }

    @Transactional
    public void deleteMenuItem(UUID itemId) {
        if (!menuItemRepository.existsById(itemId)) {
            throw new ResourceNotFoundException("MenuItem not found with id: " + itemId);
        }
        menuItemRepository.deleteById(itemId);
    }

    private MenuCategoryDto mapToMenuCategoryDto(com.farmaaishrestaurant.model.MenuCategory category) {
        List<MenuItem> menuItems = menuItemRepository.findByCategory(category);
        List<MenuItemDto> menuItemDtos = menuItems.stream()
                .map(this::mapToMenuItemDto)
                .collect(Collectors.toList());

        return MenuCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .menuItems(menuItemDtos)
                .build();
    }

    private MenuItemDto mapToMenuItemDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .isVegetarian(menuItem.isVegetarian())
                .isAvailable(menuItem.isAvailable())
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .build();
    }
}