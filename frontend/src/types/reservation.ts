// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface Reservation {
  id: string;
  customerName: string | null;
  customerContact: string | null;
  reservationDate: string | null;
  reservationTime: string | null;
  partySize: number | null;
  status: ReservationStatus | null;
}

export interface ReservationRequest {
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  reservationDate: string | null;
  reservationTime: string | null;
  numberOfGuests: number | null;
  specialRequests: string | null;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

