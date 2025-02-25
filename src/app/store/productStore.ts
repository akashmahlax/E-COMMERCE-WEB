// store/productStore.ts
import { create } from "zustand";
interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    video?: string;
  }

interface ProductState {
  selectedProduct: Product; // Replace 'any' with your product type
  setSelectedProduct: (product: Product) => void;
  clearSelectedProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));