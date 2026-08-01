package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.PostDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Post;
import com.farmaaishrestaurant.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final PostRepository postRepository;

    public BlogService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PostDto> getAllPosts() {
        return postRepository.findAllByOrderByPublishedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostDto getPostById(UUID id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        return convertToDto(post);
    }

    public PostDto createPost(PostDto postDto) {
        Post post = convertToEntity(postDto);
        post.setPublishedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost);
    }

    public PostDto updatePost(UUID id, PostDto postDto) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        existingPost.setTitle(postDto.getTitle());
        existingPost.setContent(postDto.getContent());
        existingPost.setAuthor(postDto.getAuthor());
        existingPost.setImageUrl(postDto.getImageUrl());
        existingPost.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(existingPost);
        return convertToDto(updatedPost);
    }

    public void deletePost(UUID id) {
        if (!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }

    private PostDto convertToDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .imageUrl(post.getImageUrl())
                .publishedAt(post.getPublishedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    private Post convertToEntity(PostDto postDto) {
        Post post = new Post();
        post.setId(postDto.getId()); // ID might be null for new posts
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthor(postDto.getAuthor());
        post.setImageUrl(postDto.getImageUrl());
        post.setPublishedAt(postDto.getPublishedAt());
        post.setUpdatedAt(postDto.getUpdatedAt());
        return post;
    }
}