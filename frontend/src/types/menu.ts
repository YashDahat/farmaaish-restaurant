// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface MenuCategoryDto {
  id: string;
  name: string;
  menuItems: MenuItemDto[];
}

export interface MenuItemDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  categoryId: string;
  categoryName: string;
}

