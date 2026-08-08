// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface EventInquiryResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  numberOfGuests: number;
  specialRequests: string;
  inquiryDate: string;
  status: InquiryStatus;
}

export interface CreateEventInquiryRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  numberOfGuests: number;
  specialRequests: string;
}

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

