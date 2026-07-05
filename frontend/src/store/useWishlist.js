import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlist = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = get().items;
        const exists = items.find(i => i.id === product.id);
        if (exists) set({ items: items.filter(i => i.id !== product.id) });
        else set({ items: [...items, product] });
      },
      isWishlisted: (id) => get().items.some(i => i.id === id),
      remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
    }),
    { name: 'solestore-wishlist-v1' }
  )
);

export default useWishlist;