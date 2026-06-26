package com.Velvora.service;

import com.Velvora.model.Product;
import com.Velvora.model.Review;
import com.Velvora.model.User;
import com.Velvora.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {
    Review createReview(CreateReviewRequest req, User user, Product product);
    List<Review> getReviewByProductId(Long productId);
    Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;
    Review getReviewById(Long reviewId) throws Exception;
}
