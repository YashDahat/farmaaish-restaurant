package com.farmaaishrestaurant.config;

import com.farmaaishrestaurant.model.Event;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.EventRepository;
import com.farmaaishrestaurant.repository.MenuItemCategoryRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;
    private final EventRepository eventRepository;

    public DataSeeder(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository, EventRepository eventRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedMenuItemCategories();
        seedMenuItems();
        seedEvents();
    }

    private void seedMenuItemCategories() {
        List<String> categoryNames = Arrays.asList("Appetizers", "Main Courses", "Desserts", "Beverages");
        for (String name : categoryNames) {
            Optional<MenuItemCategory> existingCategory = menuItemCategoryRepository.findByName(name);
            if (existingCategory.isEmpty()) {
                MenuItemCategory category = new MenuItemCategory();
                category.setName(name);
                category.setDescription(name + " category");
                menuItemCategoryRepository.save(category);
            }
        }
    }

    private void seedMenuItems() {
        if (menuItemRepository.count() == 0) {
            MenuItemCategory appetizers = menuItemCategoryRepository.findByName("Appetizers").orElse(null);
            MenuItemCategory mainCourses = menuItemCategoryRepository.findByName("Main Courses").orElse(null);
            MenuItemCategory desserts = menuItemCategoryRepository.findByName("Desserts").orElse(null);
            MenuItemCategory beverages = menuItemCategoryRepository.findByName("Beverages").orElse(null);

            if (appetizers != null) {
                MenuItem samosa = new MenuItem();
                samosa.setName("Samosa");
                samosa.setDescription("Crispy pastry filled with spiced potatoes and peas.");
                samosa.setPrice(new BigDecimal("5.99"));
                samosa.setImageUrl("/images/samosa.jpg");
                samosa.setVegetarian(true);
                samosa.setSpicy(false);
                samosa.setCategory(appetizers);
                menuItemRepository.save(samosa);

                MenuItem springRolls = new MenuItem();
                springRolls.setName("Spring Rolls");
                springRolls.setDescription("Vegetable spring rolls served with sweet chili sauce.");
                springRolls.setPrice(new BigDecimal("6.50"));
                springRolls.setImageUrl("/images/spring-rolls.jpg");
                springRolls.setVegetarian(true);
                springRolls.setSpicy(false);
                springRolls.setCategory(appetizers);
                menuItemRepository.save(springRolls);
            }

            if (mainCourses != null) {
                MenuItem butterChicken = new MenuItem();
                butterChicken.setName("Butter Chicken");
                butterChicken.setDescription("Creamy tomato-based curry with tender chicken pieces.");
                butterChicken.setPrice(new BigDecimal("15.99"));
                butterChicken.setImageUrl("/images/butter-chicken.jpg");
                butterChicken.setVegetarian(false);
                butterChicken.setSpicy(true);
                butterChicken.setCategory(mainCourses);
                menuItemRepository.save(butterChicken);

                MenuItem palakPaneer = new MenuItem();
                palakPaneer.setName("Palak Paneer");
                palakPaneer.setDescription("Spinach and cottage cheese curry.");
                palakPaneer.setPrice(new BigDecimal("13.99"));
                palakPaneer.setImageUrl("/images/palak-paneer.jpg");
                palakPaneer.setVegetarian(true);
                palakPaneer.setSpicy(false);
                palakPaneer.setCategory(mainCourses);
                menuItemRepository.save(palakPaneer);
            }

            if (desserts != null) {
                MenuItem gulabJamun = new MenuItem();
                gulabJamun.setName("Gulab Jamun");
                gulabJamun.setDescription("Deep-fried milk solids soaked in sugar syrup.");
                gulabJamun.setPrice(new BigDecimal("4.99"));
                gulabJamun.setImageUrl("/images/gulab-jamun.jpg");
                gulabJamun.setVegetarian(true);
                gulabJamun.setSpicy(false);
                gulabJamun.setCategory(desserts);
                menuItemRepository.save(gulabJamun);
            }

            if (beverages != null) {
                MenuItem mangoLassi = new MenuItem();
                mangoLassi.setName("Mango Lassi");
                mangoLassi.setDescription("Refreshing yogurt drink with mango pulp.");
                mangoLassi.setPrice(new BigDecimal("3.50"));
                mangoLassi.setImageUrl("/images/mango-lassi.jpg");
                mangoLassi.setVegetarian(true);
                mangoLassi.setSpicy(false);
                mangoLassi.setCategory(beverages);
                menuItemRepository.save(mangoLassi);
            }
        }
    }

    private void seedEvents() {
        if (eventRepository.count() == 0) {
            Event event1 = new Event();
            event1.setTitle("Live Music Night");
            event1.setDescription("Enjoy a soulful evening with live music performances.");
            event1.setImageUrl("/images/event-live-music.jpg");
            event1.setEventDate(LocalDate.now().plusDays(7));
            event1.setEventType("event");
            event1.setActive(true);
            eventRepository.save(event1);

            Event event2 = new Event();
            event2.setTitle("Chef's Special Tasting Menu");
            event2.setDescription("Experience a unique tasting menu crafted by our head chef.");
            event2.setImageUrl("/images/event-tasting-menu.jpg");
            event2.setEventDate(LocalDate.now().plusMonths(1));
            event2.setEventType("event");
            event2.setActive(true);
            eventRepository.save(event2);

            Event gallery1 = new Event();
            gallery1.setTitle("Restaurant Interior");
            gallery1.setDescription("A glimpse of our cozy and elegant dining space.");
            gallery1.setImageUrl("/images/gallery-interior.jpg");
            gallery1.setEventDate(null);
            gallery1.setEventType("gallery");
            gallery1.setActive(true);
            eventRepository.save(gallery1);

            Event gallery2 = new Event();
            gallery2.setTitle("Outdoor Seating");
            gallery2.setDescription("Enjoy your meal in our beautiful outdoor seating area.");
            gallery2.setImageUrl("/images/gallery-outdoor.jpg");
            gallery2.setEventDate(null);
            gallery2.setEventType("gallery");
            gallery2.setActive(true);
            eventRepository.save(gallery2);
        }
    }
}