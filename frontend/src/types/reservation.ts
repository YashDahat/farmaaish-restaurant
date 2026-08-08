// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ReservationResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string;
  numberOfGuests: number;
  specialRequests: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateReservationStatusRequest {
  status: ReservationStatus;
}

export interface CreateReservationRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string;
  numberOfGuests: number;
  specialRequests: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

