import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  url: string; // URL to coffee image
  price: number;
  quantity: number;
  shot: string | 'single' | 'double';
  select: string | 'iced' | 'hot';
  size: string | 'small' | 'medium' | 'large';
  iceLevel: number | 'no ice' | 'less ice' | 'full ice';
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.id === item.id &&
          i.shot === item.shot &&
          i.select === item.select &&
          i.size === item.size &&
          i.iceLevel === item.iceLevel
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i === existing
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));
