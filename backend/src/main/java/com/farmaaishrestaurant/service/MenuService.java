package com.farmaaishrestaurant.service;

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
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(UUID id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return convertToDto(menuItem);
    }

    public List<MenuItemDto> getMenuItemsByCategoryId(UUID categoryId) {
        MenuItemCategory category = menuItemCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + categoryId));
        return menuItemRepository.findByCategory_Id(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItemCategory category = menuItemCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + menuItemDto.getCategoryId()));

        MenuItem menuItem = convertToEntity(menuItemDto, category);
        menuItem.setId(null); // Ensure ID is generated
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToDto(savedMenuItem);
    }

    public MenuItemDto updateMenuItem(UUID id, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        MenuItemCategory category = menuItemCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + menuItemDto.getCategoryId()));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setVegetarian(menuItemDto.getVegetarian());
        existingMenuItem.setCategory(category);

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDto(updatedMenuItem);
    }

    public void deleteMenuItem(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    public List<MenuItemCategoryDto> getAllMenuItemCategories() {
        return menuItemCategoryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemCategoryDto getMenuItemCategoryById(UUID id) {
        MenuItemCategory category = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));
        return convertToDto(category);
    }

    public MenuItemCategoryDto createMenuItemCategory(MenuItemCategoryDto categoryDto) {
        MenuItemCategory category = convertToEntity(categoryDto);
        category.setId(null); // Ensure ID is generated
        MenuItemCategory savedCategory = menuItemCategoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public MenuItemCategoryDto updateMenuItemCategory(UUID id, MenuItemCategoryDto categoryDto) {
        MenuItemCategory existingCategory = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));

        existingCategory.setName(categoryDto.getName());
        existingCategory.setDescription(categoryDto.getDescription());

        MenuItemCategory updatedCategory = menuItemCategoryRepository.save(existingCategory);
        return convertToDto(updatedCategory);
    }

    public void deleteMenuItemCategory(UUID id) {
        if (!menuItemCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item category not found with id: " + id);
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
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .build();
    }

    private MenuItem convertToEntity(MenuItemDto menuItemDto, MenuItemCategory category) {
        MenuItem menuItem = new MenuItem();
        menuItem.setId(menuItemDto.getId());
        menuItem.setName(menuItemDto.getName());
        menuItem.setDescription(menuItemDto.getDescription());
        menuItem.setPrice(menuItemDto.getPrice());
        menuItem.setImageUrl(menuItemDto.getImageUrl());
        menuItem.setVegetarian(menuItemDto.getVegetarian());
        menuItem.setCategory(category);
        return menuItem;
    }

    private MenuItemCategoryDto convertToDto(MenuItemCategory category) {
        return MenuItemCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    private MenuItemCategory convertToEntity(MenuItemCategoryDto categoryDto) {
        MenuItemCategory category = new MenuItemCategory();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return category;
    }
}