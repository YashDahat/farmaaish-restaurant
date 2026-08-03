package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.CateringInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CateringInquiryRepository extends JpaRepository<CateringInquiry, UUID> {}
