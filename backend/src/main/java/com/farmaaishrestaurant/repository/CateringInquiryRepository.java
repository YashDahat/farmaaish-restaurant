package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.CateringInquiry;
import com.farmaaishrestaurant.model.InquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CateringInquiryRepository extends JpaRepository<CateringInquiry, UUID> {
    List<CateringInquiry> findByInquiryStatus(InquiryStatus status);
}