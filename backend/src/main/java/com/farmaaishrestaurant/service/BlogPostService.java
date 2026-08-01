package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.BlogPostDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.BlogPost;
import com.farmaaishrestaurant.repository.BlogPostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPostDto> getAllBlogPosts() {
        return blogPostRepository.findAll(Sort.by(Sort.Direction.DESC, "publicationDate"))
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BlogPostDto getBlogPostById(UUID id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        return convertToDto(blogPost);
    }

    public BlogPostDto createBlogPost(BlogPostDto blogPostDto) {
        BlogPost blogPost = convertToEntity(blogPostDto);
        blogPost.setPublicationDate(LocalDate.now()); // Set publication date to current date
        BlogPost savedBlogPost = blogPostRepository.save(blogPost);
        return convertToDto(savedBlogPost);
    }

    public BlogPostDto updateBlogPost(UUID id, BlogPostDto blogPostDto) {
        BlogPost existingBlogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));

        existingBlogPost.setTitle(blogPostDto.getTitle());
        existingBlogPost.setContent(blogPostDto.getContent());
        existingBlogPost.setAuthor(blogPostDto.getAuthor());
        existingBlogPost.setImageUrl(blogPostDto.getImageUrl());
        // Publication date and ID are not updated from DTO

        BlogPost updatedBlogPost = blogPostRepository.save(existingBlogPost);
        return convertToDto(updatedBlogPost);
    }

    public void deleteBlogPost(UUID id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post not found with id: " + id);
        }
        blogPostRepository.deleteById(id);
    }

    private BlogPostDto convertToDto(BlogPost blogPost) {
        return BlogPostDto.builder()
                .id(blogPost.getId())
                .title(blogPost.getTitle())
                .content(blogPost.getContent())
                .author(blogPost.getAuthor())
                .publicationDate(blogPost.getPublicationDate())
                .imageUrl(blogPost.getImageUrl())
                .build();
    }

    private BlogPost convertToEntity(BlogPostDto blogPostDto) {
        BlogPost blogPost = new BlogPost();
        blogPost.setId(blogPostDto.getId()); // ID might be null for new posts
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setContent(blogPostDto.getContent());
        blogPost.setAuthor(blogPostDto.getAuthor());
        blogPost.setPublicationDate(blogPostDto.getPublicationDate()); // Can be null for new posts, will be set in create
        blogPost.setImageUrl(blogPostDto.getImageUrl());
        return blogPost;
    }
}