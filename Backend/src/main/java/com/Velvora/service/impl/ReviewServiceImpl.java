package com.Velvora.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Velvora.model.Product;
import com.Velvora.model.Review;
import com.Velvora.model.ReviewImage;
import com.Velvora.model.User;
import com.Velvora.repository.ReviewRepository;
import com.Velvora.request.CreateReviewRequest;
import com.Velvora.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        if (req.getProductImages() != null) {
            for (String url : req.getProductImages()) {
                ReviewImage img = new ReviewImage();
                img.setUrl(url);
                img.setReview(review);
                review.getProductImages().add(img);
            }
        }

        product.getReviews().add(review);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if(review.getUser().getId().equals(userId)){
            review.setReviewText(reviewText);
            review.setRating(rating);
            return reviewRepository.save(review);
        }
        throw new Exception("you can't update this review");
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if(review.getUser().getId().equals(userId)){
            throw new Exception("you can't delete this review");
        }

        reviewRepository.delete(review);


    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId).orElseThrow(()-> new Exception(("review not found")));
    }
}
