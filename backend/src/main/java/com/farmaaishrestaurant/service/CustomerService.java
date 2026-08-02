package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CustomerDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Customer;
import com.farmaaishrestaurant.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;
import com.farmaaishrestaurant.model.User;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public CustomerDto createCustomer(CustomerDto customerDto) {
        if (customerDto.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required.");
        }
        if (customerDto.getEmail() == null || customerDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required.");
        }
        if (customerDto.getFirstName() == null || customerDto.getFirstName().isBlank()) {
            throw new IllegalArgumentException("First name is required.");
        }
        if (customerDto.getLastName() == null || customerDto.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name is required.");
        }

        if (customerRepository.findByUserId(customerDto.getUserId()).isPresent()) {
            throw new IllegalArgumentException("Customer with this User ID already exists.");
        }
        if (customerRepository.findByEmail(customerDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Customer with this email already exists.");
        }

        Customer customer = new Customer();
        customer.setUserId(customerDto.getUserId());
        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setEmail(customerDto.getEmail());
        customer.setPhone(customerDto.getPhone());
        customer.setAddress(customerDto.getAddress());

        Customer savedCustomer = customerRepository.save(customer);
        return mapToDto(savedCustomer);
    }

    public CustomerDto getCustomerById(UUID id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));
        return mapToDto(customer);
    }

    public CustomerDto getCustomerByUserId(UUID userId) {
        Customer customer = customerRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with User ID: " + userId));
        return mapToDto(customer);
    }

    @Transactional
    public CustomerDto updateCustomer(UUID id, CustomerDto customerDto) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));

        if (customerDto.getFirstName() != null && !customerDto.getFirstName().isBlank()) {
            existingCustomer.setFirstName(customerDto.getFirstName());
        }
        if (customerDto.getLastName() != null && !customerDto.getLastName().isBlank()) {
            existingCustomer.setLastName(customerDto.getLastName());
        }
        if (customerDto.getEmail() != null && !customerDto.getEmail().isBlank()) {
            if (!existingCustomer.getEmail().equals(customerDto.getEmail())) {
                if (customerRepository.findByEmail(customerDto.getEmail()).isPresent()) {
                    throw new IllegalArgumentException("Customer with this email already exists.");
                }
                existingCustomer.setEmail(customerDto.getEmail());
            }
        }
        if (customerDto.getPhone() != null) {
            existingCustomer.setPhone(customerDto.getPhone());
        }
        if (customerDto.getAddress() != null) {
            existingCustomer.setAddress(customerDto.getAddress());
        }

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return mapToDto(updatedCustomer);
    }

    private CustomerDto mapToDto(Customer customer) {
        return CustomerDto.builder()
                .id(customer.getId())
                .userId(customer.getUserId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .build();
    }
}