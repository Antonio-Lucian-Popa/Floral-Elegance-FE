import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";
import { getAuthToken } from "@/lib/auth";

export interface Decoration {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: Array<{ name: string; code: string }>;
}

class DecorationsService {
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

  async getAllDecorations(): Promise<Decoration[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DECORATIONS.LIST}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch decorations");
    }

    return response.json();
  }

  async getDecorationById(id: string): Promise<Decoration> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DECORATIONS.DETAILS(id)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch decoration details");
    }

    return response.json();
  }

  async getFlowerDecorations(flowerId: string): Promise<Decoration[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DECORATIONS.FOR_FLOWER(flowerId)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flower decorations");
    }

    return response.json();
  }
}

export const decorationsService = new DecorationsService();