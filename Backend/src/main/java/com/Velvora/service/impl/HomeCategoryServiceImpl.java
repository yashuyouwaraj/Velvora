package com.Velvora.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Velvora.model.HomeCategory;
import com.Velvora.repository.HomeCategoryRepository;
import com.Velvora.service.HomeCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
        if(homeCategoryRepository.findAll().isEmpty()){
            return homeCategoryRepository.saveAll(homeCategories);
        }
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory category, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(()-> new Exception("Category not found"));

        if (category.getImage() != null) {
            existingCategory.setImage(category.getImage());
        }
        if (category.getCategoryId() != null) {
            existingCategory.setCategoryId(category.getCategoryId());
        }
        if (category.getName() != null) {
            existingCategory.setName(category.getName());
        }
        if (category.getSection() != null) {
            existingCategory.setSection(category.getSection());
        }
        return homeCategoryRepository.save(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
