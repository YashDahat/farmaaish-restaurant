package com.farmaaishrestaurant.config;

import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.MenuItemCategoryRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;

    public DataSeeder(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (menuItemCategoryRepository.count() == 0) {
            MenuItemCategory appetizers = new MenuItemCategory();
            appetizers.setName("Appetizers");
            appetizers.setDescription("Starters to get your meal going.");

            MenuItemCategory mainCourses = new MenuItemCategory();
            mainCourses.setName("Main Courses");
            mainCourses.setDescription("Hearty dishes for a fulfilling meal.");

            MenuItemCategory desserts = new MenuItemCategory();
            desserts.setName("Desserts");
            desserts.setDescription("Sweet treats to end your meal.");

            MenuItemCategory beverages = new MenuItemCategory();
            beverages.setName("Beverages");
            beverages.setDescription("Refreshing drinks.");

            menuItemCategoryRepository.saveAll(Arrays.asList(appetizers, mainCourses, desserts, beverages));

            MenuItem samosa = new MenuItem("Samosa", "Crispy pastry filled with spiced potatoes and peas.", new BigDecimal("5.99"), "https://example.com/samosa.jpg", true, true, true, appetizers);
            MenuItem springRolls = new MenuItem("Spring Rolls", "Vegetable spring rolls with sweet chili sauce.", new BigDecimal("6.50"), "https://example.com/springrolls.jpg", true, false, true, appetizers);

            MenuItem butterChicken = new MenuItem("Butter Chicken", "Creamy tomato-based curry with tender chicken.", new BigDecimal("18.99"), "https://example.com/butterchicken.jpg", false, false, true, mainCourses);
            MenuItem paneerTikkaMasala = new MenuItem("Paneer Tikka Masala", "Cubes of paneer in a rich, spicy gravy.", new BigDecimal("17.50"), "https://example.com/paneertikka.jpg", true, true, true, mainCourses);
            MenuItem biryani = new MenuItem("Chicken Biryani", "Fragrant basmati rice cooked with chicken and spices.", new BigDecimal("19.99"), "https://example.com/biryani.jpg", false, true, true, mainCourses);

            MenuItem gulabJamun = new MenuItem("Gulab Jamun", "Deep-fried milk solids soaked in sugar syrup.", new BigDecimal("7.00"), "https://example.com/gulabjamun.jpg", true, false, true, desserts);
            MenuItem kulfi = new MenuItem("Kulfi", "Traditional Indian ice cream.", new BigDecimal("6.50"), "https://example.com/kulfi.jpg", true, false, true, desserts);

            MenuItem mangoLassi = new MenuItem("Mango Lassi", "Sweet yogurt drink with mango pulp.", new BigDecimal("4.99"), "https://example.com/mangolassi.jpg", true, false, true, beverages);
            MenuItem coke = new MenuItem("Coca-Cola", "Classic carbonated soft drink.", new BigDecimal("2.50"), "https://example.com/coke.jpg", true, false, true, beverages);

            menuItemRepository.saveAll(Arrays.asList(samosa, springRolls, butterChicken, paneerTikkaMasala, biryani, gulabJamun, kulfi, mangoLassi, coke));
        }
    }
}