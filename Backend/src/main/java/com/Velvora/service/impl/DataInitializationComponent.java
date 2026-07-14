package com.Velvora.service.impl;

import com.Velvora.domain.USER_ROLE;
import com.Velvora.model.Category;
import com.Velvora.model.Product;
import com.Velvora.model.User;
import com.Velvora.repository.CategoryRepository;
import com.Velvora.repository.ProductRepository;
import com.Velvora.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@org.springframework.core.annotation.Order(2)
public class DataInitializationComponent implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private static final String CATALOG_URL = "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json";

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
        initializeCatalog();
    }

    private void initializeAdminUser(){
        String adminUsername="yasuyouwaraj@gmail.com";
        if(userRepository.findByEmail(adminUsername)==null){
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("amanyasu"));
            adminUser.setFullName("Aman");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

            userRepository.save(adminUser);
        }
    }

    /** Loads the supplied public catalogue once, while preserving seller-created products. */
    private void initializeCatalog() {
        if (productRepository.count() > 0) return;

        try {
            HttpRequest request = HttpRequest.newBuilder(URI.create(CATALOG_URL)).GET().build();
            String body = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString()).body();
            JsonNode products = new ObjectMapper().readTree(body);

            for (JsonNode item : products) {
                String department = item.path("category").asText("Other");
                String subCategory = item.path("subCategory").asText("General");
                Category parent = findOrCreateCategory(slug(department), department, 1, null);
                Category category = findOrCreateCategory(slug(department + "-" + subCategory), subCategory, 2, parent);
                int price = Math.max(1, item.path("priceCents").asInt(1000));
                int mrp = (int) Math.ceil(price / 0.85d);

                Product product = new Product();
                product.setTitle(item.path("name").asText());
                product.setDescription(item.path("description").asText());
                product.setMrpPrice(mrp);
                product.setSellingPrice(price);
                product.setDiscountPercent((int) Math.round((mrp - price) * 100d / mrp));
                product.setQuantity(25);
                product.setColor("Assorted");
                String imageUrl = item.path("image").asText();
                if (imageUrl != null && !imageUrl.isEmpty()) {
                    com.Velvora.model.ProductImage img = new com.Velvora.model.ProductImage();
                    img.setUrl(imageUrl);
                    img.setProduct(product);
                    product.getImages().add(img);
                }
                product.setNumRatings(item.path("rating").path("count").asInt());
                product.setSizes("Standard");
                product.setCategory(category);
                product.setCreatedAt(LocalDateTime.now());
                productRepository.save(product);
            }
        } catch (Exception exception) {
            // The storefront stays usable if the external seed source is temporarily unavailable.
            System.err.println("Unable to seed Velvora's initial catalogue: " + exception.getMessage());
        }
    }

    private Category findOrCreateCategory(String categoryId, String name, int level, Category parent) {
        Category existing = categoryRepository.findByCategoryId(categoryId);
        if (existing != null) return existing;
        Category category = new Category();
        category.setCategoryId(categoryId);
        category.setName(name);
        category.setLevel(level);
        category.setParentCategory(parent);
        return categoryRepository.save(category);
    }

    private String slug(String value) {
        return value.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
