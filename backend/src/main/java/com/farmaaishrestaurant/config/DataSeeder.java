package com.farmaaishrestaurant.config;

import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import com.farmaaishrestaurant.repository.MenuItemCategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        return args -> {
            // Seed MenuItemCategory
            com.farmaaishrestaurant.model.MenuItemCategory mainCourseCategory = new com.farmaaishrestaurant.model.MenuItemCategory();
            mainCourseCategory.setName("Main Course");

            com.farmaaishrestaurant.model.MenuItemCategory appetizerCategory = new com.farmaaishrestaurant.model.MenuItemCategory();
            appetizerCategory.setName("Appetizers");

            com.farmaaishrestaurant.model.MenuItemCategory dessertCategory = new com.farmaaishrestaurant.model.MenuItemCategory();
            dessertCategory.setName("Desserts");

            menuItemCategoryRepository.saveAll(Arrays.asList(mainCourseCategory, appetizerCategory, dessertCategory));

            // Seed MenuItem
            MenuItem biryani = new MenuItem();
            biryani.setName("Chicken Biryani");
            biryani.setDescription("Aromatic basmati rice cooked with tender chicken pieces and traditional spices.");
            biryani.setPrice(new BigDecimal("15.99"));
            biryani.setImageUrl("https://example.com/biryani.jpg");
            biryani.setVegetarian(false);
            biryani.setAvailable(true);
            biryani.setCategory(mainCourseCategory);

            MenuItem paneerTikka = new MenuItem();
            paneerTikka.setName("Paneer Tikka");
            paneerTikka.setDescription("Cubes of paneer marinated in spices and grilled in a tandoor.");
            paneerTikka.setPrice(new BigDecimal("12.50"));
            paneerTikka.setImageUrl("https://example.com/paneer_tikka.jpg");
            paneerTikka.setVegetarian(true);
            paneerTikka.setAvailable(true);
            paneerTikka.setCategory(appetizerCategory);

            MenuItem gulabJamun = new MenuItem();
            gulabJamun.setName("Gulab Jamun");
            gulabJamun.setDescription("Deep-fried milk-solid balls soaked in rose-flavored sugar syrup.");
            gulabJamun.setPrice(new BigDecimal("6.00"));
            gulabJamun.setImageUrl("https://example.com/gulab_jamun.jpg");
            gulabJamun.setVegetarian(true);
            gulabJamun.setAvailable(true);
            gulabJamun.setCategory(dessertCategory);

            menuItemRepository.saveAll(Arrays.asList(biryani, paneerTikka, gulabJamun));
        };
    }
}