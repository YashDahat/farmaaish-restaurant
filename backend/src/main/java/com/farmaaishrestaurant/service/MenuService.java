package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItemDto> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemDto> getMenuItemsByCategory(MenuItemCategory category) {
        return menuItemRepository.findAllByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(UUID id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return convertToDto(menuItem);
    }

    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItem menuItem = convertToEntity(menuItemDto);
        menuItem = menuItemRepository.save(menuItem);
        return convertToDto(menuItem);
    }

    public MenuItemDto updateMenuItem(UUID id, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setCategory(menuItemDto.getCategory());

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDto(updatedMenuItem);
    }

    public void deleteMenuItem(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    private MenuItemDto convertToDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .category(menuItem.getCategory())
                .build();
    }

    private MenuItem convertToEntity(MenuItemDto menuItemDto) {
        return new MenuItem(
                menuItemDto.getName(),
                menuItemDto.getDescription(),
                menuItemDto.getPrice(),
                menuItemDto.getImageUrl(),
                menuItemDto.getCategory()
        );
    }
}