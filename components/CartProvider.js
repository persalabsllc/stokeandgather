'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'stoke-and-gather-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { ...product, quantity }];
    });
  }

  function setQuantity(id, quantity) {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  const value = useMemo(() => ({
    items,
    addItem,
    setQuantity,
    removeItem,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used inside CartProvider');
  return cart;
}
