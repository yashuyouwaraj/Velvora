package com.Velvora.service;

import com.Velvora.model.Home;
import com.Velvora.model.HomeCategory;

import java.util.List;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);
}
