import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";
import { getAuthToken } from "@/lib/auth";
import { Flower } from "./flowers.service";
import { Decoration } from "./decorations.service";

export interface CartItem {
  id: string;
  flower: Flower;
  decoration?: Decoration;
  decorationColor?: string;
  message?: string;
  userId: string;
  createdAt: string;
}

export interface AddToCartData {
  flowerId: string;
  decorationId?: string;
  decorationColor?: string;
  message?: string;
  deliveryDate: string;
  deliveryAddress: string;
}

class CartService {
  private getHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async getUserCart(userId: string): Promise<CartItem[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CART.USER_CART(userId)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user cart");
    }

    return response.json();
  }

  async addToCart(userId: string, data: AddToCartData): Promise<CartItem> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CART.ADD_ITEM(userId)}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    return response.json();
  }

  async removeFromCart(userId: string, itemId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CART.REMOVE_ITEM(itemId, userId)}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  }

  async checkout(userId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CART.CHECKOUT(userId)}`, {
      method: "POST",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Checkout failed");
    }
  }
}

export const cartService = new CartService();