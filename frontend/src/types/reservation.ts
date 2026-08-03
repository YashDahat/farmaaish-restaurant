// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ReservationDto {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  specialRequests: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface CreateReservationRequest {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  specialRequests: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

