package com.farmaaishrestaurant.service;

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
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemDto> getMenuItemsByCategory(UUID categoryId) {
        MenuItemCategory category = menuItemCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + categoryId));
        return menuItemRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + id));
        return convertToDto(menuItem);
    }

    public List<MenuItemCategory> getAllMenuItemCategories() {
        return menuItemCategoryRepository.findAll();
    }

    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItemCategory category = menuItemCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + menuItemDto.getCategoryId()));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(menuItemDto.getName());
        menuItem.setDescription(menuItemDto.getDescription());
        menuItem.setPrice(menuItemDto.getPrice());
        menuItem.setImageUrl(menuItemDto.getImageUrl());
        menuItem.setVegetarian(menuItemDto.getVegetarian());
        menuItem.setAvailable(menuItemDto.getAvailable());
        menuItem.setCategory(category);

        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToDto(savedMenuItem);
    }

    public MenuItemDto updateMenuItem(Long id, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + id));

        MenuItemCategory category = menuItemCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + menuItemDto.getCategoryId()));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setVegetarian(menuItemDto.getVegetarian());
        existingMenuItem.setAvailable(menuItemDto.getAvailable());
        existingMenuItem.setCategory(category);

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDto(updatedMenuItem);
    }

    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with ID: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    public MenuItemCategory createMenuItemCategory(MenuItemCategory category) {
        return menuItemCategoryRepository.save(category);
    }

    public MenuItemCategory updateMenuItemCategory(UUID id, MenuItemCategory category) {
        MenuItemCategory existingCategory = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
        existingCategory.setName(category.getName());
        return menuItemCategoryRepository.save(existingCategory);
    }

    public void deleteMenuItemCategory(UUID id) {
        if (!menuItemCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with ID: " + id);
        }
        menuItemCategoryRepository.deleteById(id);
    }

    private MenuItemDto convertToDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .vegetarian(menuItem.isVegetarian())
                .available(menuItem.isAvailable())
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .build();
    }
}