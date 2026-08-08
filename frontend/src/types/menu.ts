// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface MenuItemDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  vegetarian: boolean;
  categoryId: string;
  categoryName: string;
}

export interface MenuItemCategoryDto {
  id: string;
  name: string;
  description: string;
}

