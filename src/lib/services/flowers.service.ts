import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";
import { getAuthToken } from "@/lib/auth";

export interface Flower {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

class FlowersService {
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

  async getAllFlowers(params?: { minPrice?: number; maxPrice?: number; sort?: string }): Promise<Flower[]> {
    const queryParams = new URLSearchParams();
    if (params?.minPrice) queryParams.append("minPrice", params.minPrice.toString());
    if (params?.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
    if (params?.sort) queryParams.append("sort", params.sort);

    const url = `${API_BASE_URL}${API_ENDPOINTS.FLOWERS.LIST}?${queryParams.toString()}`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flowers");
    }

    return response.json();
  }

  async getFlowerById(id: string): Promise<Flower> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FLOWERS.DETAILS(id)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flower details");
    }

    return response.json();
  }

  async getPopularFlowers(): Promise<Flower[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FLOWERS.POPULAR}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch popular flowers");
    }

    return response.json();
  }
}

export const flowersService = new FlowersService();