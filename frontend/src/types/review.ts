// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ReviewDto {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  source: string;
  reviewDate: string;
  isFeatured: boolean;
}

