package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.ReviewDto;
import com.farmaaishrestaurant.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ReviewDto>> getFeaturedReviews() {
        List<ReviewDto> featuredReviews = reviewService.getFeaturedReviews();
        return ResponseEntity.ok(featuredReviews);
    }
}