import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant = null, quantity = 1) => {
        const key = `${product.id}-${variant?.id || 'default'}`;
        const items = get().items;
        const existing = items.find(i => i.key === key);
        if (existing) {
          set({ items: items.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) });
        } else {
          set({ items: [...items, { key, product, variant, quantity }] });
        }
      },

      removeItem: (key) => set({ items: get().items.filter(i => i.key !== key) }),

      updateQuantity: (key, quantity) => {
        if (quantity < 1) { get().removeItem(key); return; }
        set({ items: get().items.map(i => i.key === key ? { ...i, quantity } : i) });
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, item) => {
          const price = parseFloat(item.product.sale_price || item.product.price);
          return sum + price * item.quantity;
        }, 0);
      },

      get count() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: 'solestore-cart-v1' }
  )
);

export default useCart;