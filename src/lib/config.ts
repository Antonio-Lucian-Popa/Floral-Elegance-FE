// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  FLOWERS: {
    LIST: "/flowers",
    DETAILS: (id: string) => `/flowers/${id}`,
    POPULAR: "/flowers/popular",
  },
  DECORATIONS: {
    LIST: "/decorations",
    DETAILS: (id: string) => `/decorations/${id}`,
    FOR_FLOWER: (flowerId: string) => `/flowers/${flowerId}/decorations`,
  },
  CART: {
    USER_CART: (userId: string) => `/cart/user/${userId}`,
    ADD_ITEM: (userId: string) => `/cart/user/${userId}`,
    REMOVE_ITEM: (itemId: string, userId: string) => `/cart/${itemId}/user/${userId}`,
    CHECKOUT: (userId: string) => `/cart/checkout/user/${userId}`,
  },
  ORDERS: {
    LIST: (userId: string) => `/orders/user/${userId}`,
    DETAILS: (orderId: string, userId: string) => `/orders/${orderId}/user/${userId}`,
    CREATE: (userId: string) => `/orders/user/${userId}`,
    CANCEL: (orderId: string, userId: string) => `/orders/${orderId}/cancel/user/${userId}`,
  },
};