// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ReservationResponse {
  id: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  reservationDate: string | null;
  reservationTime: string | null;
  partySize: number | null;
  specialRequests: string | null;
  status: ReservationStatus | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UpdateReservationStatusRequest {
  status: ReservationStatus | null;
}

export interface CreateReservationRequest {
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  reservationDate: string | null;
  reservationTime: string | null;
  partySize: number | null;
  specialRequests: string | null;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

