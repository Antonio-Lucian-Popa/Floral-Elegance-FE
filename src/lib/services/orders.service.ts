import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";
import { getAuthToken } from "@/lib/auth";
import { Flower } from "./flowers.service";
import { Decoration } from "./decorations.service";

export interface Order {
  id: string;
  flower: Flower;
  decoration?: Decoration;
  decorationColor?: string;
  message?: string;
  totalPrice: number;
  deliveryAddress: string;
  deliveryDate: string;
  status: string;
  createdAt: string;
}

export interface CreateOrderData {
  flowerId: string;
  decorationId?: string;
  decorationColor?: string;
  message?: string;
  deliveryDate: string;
  deliveryAddress: string;
}

class OrdersService {
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

  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDERS.LIST(userId)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user orders");
    }

    return response.json();
  }

  async getOrderDetails(userId: string, orderId: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDERS.DETAILS(orderId, userId)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }

    return response.json();
  }

  async createOrder(userId: string, data: CreateOrderData): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDERS.CREATE(userId)}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  }

  async cancelOrder(userId: string, orderId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDERS.CANCEL(orderId, userId)}`, {
      method: "PUT",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to cancel order");
    }
  }
}

export const ordersService = new OrdersService();