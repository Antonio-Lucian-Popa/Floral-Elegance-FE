// Auth utilities and types
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "CLIENT" | "SELLER";
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };
  
  export const getUserRole = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role");
    }
    return null;
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  export const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  };