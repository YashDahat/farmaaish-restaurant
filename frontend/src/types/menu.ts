// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface MenuItemDto {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  vegetarian: boolean;
  available: boolean;
  categoryId: number;
  categoryName: string;
}

export interface MenuItemCategory {
  id: number;
  name: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  vegetarian: boolean;
  available: boolean;
  category: MenuItemCategory;
}

