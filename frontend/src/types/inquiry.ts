// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface CateringInquiryDto {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  numberOfGuests: number;
  budget: number;
  specialRequests: string;
  inquiryDate: string;
}

