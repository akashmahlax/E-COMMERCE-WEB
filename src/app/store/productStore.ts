// app/store/productStore.ts
import { create } from 'zustand';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrls: string[];
  videoUrl?: string;
  description?: string; // Add description if needed
}

interface ProductState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearSelectedProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));