package com.farmaaishrestaurant.config;

import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.MenuItemCategoryRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MenuItemCategoryRepository menuItemCategoryRepository;
    private final MenuItemRepository menuItemRepository;

    public DataSeeder(MenuItemCategoryRepository menuItemCategoryRepository, MenuItemRepository menuItemRepository) {
        this.menuItemCategoryRepository = menuItemCategoryRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (menuItemCategoryRepository.count() == 0) {
            MenuItemCategory appetizers = new MenuItemCategory();
            appetizers.setName("Appetizers");
            appetizers.setDescription("Starters to get your meal going.");
            menuItemCategoryRepository.save(appetizers);

            MenuItemCategory mainCourses = new MenuItemCategory();
            mainCourses.setName("Main Courses");
            mainCourses.setDescription("Hearty dishes for your main meal.");
            menuItemCategoryRepository.save(mainCourses);

            MenuItemCategory desserts = new MenuItemCategory();
            desserts.setName("Desserts");
            desserts.setDescription("Sweet treats to finish your meal.");
            menuItemCategoryRepository.save(desserts);

            MenuItemCategory beverages = new MenuItemCategory();
            beverages.setName("Beverages");
            beverages.setDescription("Refreshing drinks.");
            menuItemCategoryRepository.save(beverages);

            if (menuItemRepository.count() == 0) {
                MenuItem samosa = new MenuItem();
                samosa.setName("Samosa");
                samosa.setDescription("Crispy pastry filled with spiced potatoes and peas.");
                samosa.setPrice(new BigDecimal("5.99"));
                samosa.setImageUrl("https://example.com/samosa.jpg");
                samosa.setVegetarian(true);
                samosa.setCategory(appetizers);

                MenuItem butterChicken = new MenuItem();
                butterChicken.setName("Butter Chicken");
                butterChicken.setDescription("Tender chicken cooked in a rich, creamy tomato sauce.");
                butterChicken.setPrice(new BigDecimal("15.99"));
                butterChicken.setImageUrl("https://example.com/butterchicken.jpg");
                butterChicken.setVegetarian(false);
                butterChicken.setCategory(mainCourses);

                MenuItem gulabJamun = new MenuItem();
                gulabJamun.setName("Gulab Jamun");
                gulabJamun.setDescription("Deep-fried milk solids soaked in a sweet rose syrup.");
                gulabJamun.setPrice(new BigDecimal("6.50"));
                gulabJamun.setImageUrl("https://example.com/gulabjamun.jpg");
                gulabJamun.setVegetarian(true);
                gulabJamun.setCategory(desserts);

                MenuItem mangoLassi = new MenuItem();
                mangoLassi.setName("Mango Lassi");
                mangoLassi.setDescription("A refreshing yogurt drink with mango pulp.");
                mangoLassi.setPrice(new BigDecimal("4.99"));
                mangoLassi.setImageUrl("https://example.com/mangolassi.jpg");
                mangoLassi.setVegetarian(true);
                mangoLassi.setCategory(beverages);

                menuItemRepository.saveAll(Arrays.asList(samosa, butterChicken, gulabJamun, mangoLassi));
            }
        }
    }
}