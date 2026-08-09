package com.farmaaishrestaurant.config;

import com.farmaaishrestaurant.model.MenuCategory;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.repository.MenuCategoryRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MenuCategoryRepository categoryRepository, MenuItemRepository menuItemRepository) {
        return args -> {
            if (categoryRepository.count() == 0 && menuItemRepository.count() == 0) {
                // Seed Menu Categories
                MenuCategory appetizers = new MenuCategory();
                appetizers.setName("Appetizers");
                appetizers.setDescription("Delicious starters to whet your appetite.");
                categoryRepository.save(appetizers);

                MenuCategory mainCourses = new MenuCategory();
                mainCourses.setName("Main Courses");
                mainCourses.setDescription("Hearty and satisfying main dishes.");
                categoryRepository.save(mainCourses);

                MenuCategory desserts = new MenuCategory();
                desserts.setName("Desserts");
                desserts.setDescription("Sweet treats to end your meal.");
                categoryRepository.save(desserts);

                MenuCategory beverages = new MenuCategory();
                beverages.setName("Beverages");
                beverages.setDescription("Refreshing drinks.");
                categoryRepository.save(beverages);

                // Seed Menu Items
                MenuItem springRolls = new MenuItem();
                springRolls.setName("Spring Rolls");
                springRolls.setDescription("Crispy fried rolls filled with vegetables.");
                springRolls.setPrice(new BigDecimal("5.99"));
                springRolls.setCategory(appetizers);
                menuItemRepository.save(springRolls);

                MenuItem chickenCurry = new MenuItem();
                chickenCurry.setName("Chicken Curry");
                chickenCurry.setDescription("Classic chicken curry served with rice.");
                chickenCurry.setPrice(new BigDecimal("12.50"));
                chickenCurry.setCategory(mainCourses);
                menuItemRepository.save(chickenCurry);

                MenuItem chocolateLavaCake = new MenuItem();
                chocolateLavaCake.setName("Chocolate Lava Cake");
                chocolateLavaCake.setDescription("Warm chocolate cake with a molten center.");
                chocolateLavaCake.setPrice(new BigDecimal("7.00"));
                chocolateLavaCake.setCategory(desserts);
                menuItemRepository.save(chocolateLavaCake);

                MenuItem freshLimeSoda = new MenuItem();
                freshLimeSoda.setName("Fresh Lime Soda");
                freshLimeSoda.setDescription("Refreshing lime soda.");
                freshLimeSoda.setPrice(new BigDecimal("3.50"));
                freshLimeSoda.setCategory(beverages);
                menuItemRepository.save(freshLimeSoda);

                MenuItem paneerTikka = new MenuItem();
                paneerTikka.setName("Paneer Tikka");
                paneerTikka.setDescription("Grilled paneer marinated in spices.");
                paneerTikka.setPrice(new BigDecimal("9.99"));
                paneerTikka.setCategory(appetizers);
                menuItemRepository.save(paneerTikka);

                MenuItem biryani = new MenuItem();
                biryani.setName("Vegetable Biryani");
                biryani.setDescription("Fragrant basmati rice cooked with mixed vegetables and spices.");
                biryani.setPrice(new BigDecimal("11.75"));
                biryani.setCategory(mainCourses);
                menuItemRepository.save(biryani);

                MenuItem gulabJamun = new MenuItem();
                gulabJamun.setName("Gulab Jamun");
                gulabJamun.setDescription("Deep-fried milk solids soaked in sugar syrup.");
                gulabJamun.setPrice(new BigDecimal("4.50"));
                gulabJamun.setCategory(desserts);
                menuItemRepository.save(gulabJamun);

                MenuItem mangoLassi = new MenuItem();
                mangoLassi.setName("Mango Lassi");
                mangoLassi.setDescription("Sweet yogurt drink with mango pulp.");
                mangoLassi.setPrice(new BigDecimal("4.00"));
                mangoLassi.setCategory(beverages);
                menuItemRepository.save(mangoLassi);

                System.out.println("Database seeded with initial menu categories and items.");
            } else {
                System.out.println("Database already contains data. Skipping seeding.");
            }
        };
    }
}