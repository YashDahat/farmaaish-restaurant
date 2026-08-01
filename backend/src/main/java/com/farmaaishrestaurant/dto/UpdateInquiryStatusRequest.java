package com.farmaaishrestaurant.dto;

import com.farmaaishrestaurant.model.InquiryStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInquiryStatusRequest {
    private InquiryStatus status;
}
