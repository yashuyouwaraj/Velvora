package com.Velvora.controller;

import com.Velvora.model.Home;
import com.Velvora.model.HomeCategory;
import com.Velvora.service.HomeCategoryService;
import com.Velvora.service.HomeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HomeCategoryController.class)
class HomeCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HomeCategoryService homeCategoryService;

    @MockBean
    private HomeService homeService;

    @Test
    void shouldReturnHomePageData() throws Exception {
        HomeCategory category = new HomeCategory();
        category.setId(1L);
        category.setCategoryId("mobiles");
        category.setName("Mobiles");
        category.setImage("https://example.com/mobile.png");

        Home home = new Home();
        home.setGrid(List.of(category));
        home.setShopByCategory(List.of());
        home.setElectricCategories(List.of());
        home.setDeals(List.of());
        home.setDealCategories(List.of());

        when(homeCategoryService.getAllHomeCategories()).thenReturn(List.of(category));
        when(homeService.createHomePageData(List.of(category))).thenReturn(home);

        mockMvc.perform(get("/home"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.grid[0].categoryId").value("mobiles"));
    }
}
