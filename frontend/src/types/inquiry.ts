// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface InquiryDto {
  id: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  eventType: string | null;
  eventDate: string | null;
  numberOfGuests: number | null;
  message: string | null;
  inquiryDate: string | null;
  status: InquiryStatus | null;
}

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

