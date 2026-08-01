package com.farmaaishrestaurant.config;

import com.farmaaishrestaurant.model.BlogPost;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.MenuItemCategory;
import com.farmaaishrestaurant.repository.BlogPostRepository;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MenuItemRepository menuItemRepository, BlogPostRepository blogPostRepository) {
        return args -> {
            // Seed Menu Items
            if (menuItemRepository.count() == 0) {
                menuItemRepository.save(new MenuItem("Chicken Biryani", "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.", new BigDecimal("15.99"), "/images/chicken-biryani.jpg", MenuItemCategory.MAIN_COURSE));
                menuItemRepository.save(new MenuItem("Paneer Tikka Masala", "Cubes of paneer (Indian cheese) cooked in a rich, creamy tomato gravy.", new BigDecimal("14.50"), "/images/paneer-tikka-masala.jpg", MenuItemCategory.MAIN_COURSE));
                menuItemRepository.save(new MenuItem("Garlic Naan", "Soft, fluffy Indian bread brushed with garlic butter.", new BigDecimal("3.50"), "/images/garlic-naan.jpg", MenuItemCategory.BREAD));
                menuItemRepository.save(new MenuItem("Gulab Jamun", "Deep-fried milk solids soaked in a rose-flavored sugar syrup.", new BigDecimal("5.00"), "/images/gulab-jamun.jpg", MenuItemCategory.DESSERT));
                menuItemRepository.save(new MenuItem("Mango Lassi", "A refreshing yogurt drink blended with ripe mangoes.", new BigDecimal("4.50"), "/images/mango-lassi.jpg", MenuItemCategory.BEVERAGE));
                menuItemRepository.save(new MenuItem("Vegetable Samosa", "Crispy pastry filled with spiced potatoes and peas.", new BigDecimal("6.00"), "/images/vegetable-samosa.jpg", MenuItemCategory.APPETIZER));
                menuItemRepository.save(new MenuItem("Tandoori Chicken", "Chicken marinated in yogurt and spices, cooked in a tandoor.", new BigDecimal("16.99"), "/images/tandoori-chicken.jpg", MenuItemCategory.MAIN_COURSE));
                menuItemRepository.save(new MenuItem("Dal Makhani", "Black lentils cooked overnight with butter and cream.", new BigDecimal("13.00"), "/images/dal-makhani.jpg", MenuItemCategory.MAIN_COURSE));
                menuItemRepository.save(new MenuItem("Butter Naan", "Soft, fluffy Indian bread brushed with butter.", new BigDecimal("3.00"), "/images/butter-naan.jpg", MenuItemCategory.BREAD));
                menuItemRepository.save(new MenuItem("Rasmalai", "Soft cheese dumplings soaked in sweetened, thickened milk.", new BigDecimal("5.50"), "/images/rasmalai.jpg", MenuItemCategory.DESSERT));
                menuItemRepository.save(new MenuItem("Masala Chai", "Spiced Indian tea with milk.", new BigDecimal("3.00"), "/images/masala-chai.jpg", MenuItemCategory.BEVERAGE));
                menuItemRepository.save(new MenuItem("Onion Bhaji", "Crispy onion fritters.", new BigDecimal("5.50"), "/images/onion-bhaji.jpg", MenuItemCategory.APPETIZER));
            }

            // Seed Blog Posts
            if (blogPostRepository.count() == 0) {
                blogPostRepository.save(new BlogPost(
                        "The History of Biryani",
                        "Biryani, a dish of Persian origin, has become a staple in Indian cuisine. Its rich history dates back centuries, evolving with various regional influences.",
                        "Chef Rahul",
                        LocalDate.of(2023, 10, 26),
                        "/images/blog/biryani-history.jpg"
                ));
                blogPostRepository.save(new BlogPost(
                        "Exploring Indian Spices",
                        "Indian cuisine is renowned for its vibrant use of spices. From turmeric to cardamom, each spice plays a unique role in creating complex flavors.",
                        "Food Critic Priya",
                        LocalDate.of(2023, 11, 15),
                        "/images/blog/indian-spices.jpg"
                ));
                blogPostRepository.save(new BlogPost(
                        "The Art of Making Naan",
                        "Naan, a leavened, oven-baked flatbread, is a popular accompaniment to many Indian dishes. Discover the traditional methods of preparing this delicious bread.",
                        "Baker Anil",
                        LocalDate.of(2023, 12, 1),
                        "/images/blog/naan-art.jpg"
                ));
                blogPostRepository.save(new BlogPost(
                        "Top 5 Indian Desserts You Must Try",
                        "India offers a plethora of sweet delights. Here are our top 5 picks, from the classic Gulab Jamun to the refreshing Kulfi.",
                        "Sweet Tooth Sara",
                        LocalDate.of(2024, 1, 10),
                        "/images/blog/top-desserts.jpg"
                ));
                blogPostRepository.save(new BlogPost(
                        "A Guide to Pairing Indian Food with Wine",
                        "Pairing wine with Indian food can be a delightful experience. Learn which wines best complement the rich and diverse flavors of Indian cuisine.",
                        "Sommelier David",
                        LocalDate.of(2024, 2, 20),
                        "/images/blog/wine-pairing.jpg"
                ));
            }
        };
    }
}