// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface MenuItemDto {
  id: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  vegetarian: boolean | null;
  spicy: boolean | null;
  categoryId: string | null;
  categoryName: string | null;
}

export interface MenuItemCategory {
  id: string;
  name: string | null;
  description: string | null;
}

