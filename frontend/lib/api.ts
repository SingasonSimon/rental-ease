import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Track ongoing refresh requests to prevent multiple simultaneous refreshes
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeToRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
};

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Don't attempt to refresh for login or register requests
            if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/register')) {
                return Promise.reject(error);
            }

            // Prevent infinite retry loop
            if (originalRequest.url === '/auth/refresh') {
                isRefreshing = false;
                refreshSubscribers = [];
                if (typeof window !== 'undefined') {
                    // Only redirect if not already on login or register page
                    if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (isRefreshing) {
                // If already refreshing, wait for the new token
                return new Promise((resolve) => {
                    subscribeToRefresh((token) => {
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                // Try to refresh token
                await api.post('/auth/refresh');
                isRefreshing = false;
                onRefreshed('new-token');
                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];
                if (typeof window !== 'undefined') {
                    // Only redirect if not already on login or register page
                    if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// ========== Auth API ==========
export const authApi = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) =>
        api.post('/auth/register', data),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
};

// ========== Properties API ==========
export interface Property {
    id: string;
    name: string;
    address: string;
    city: string;
    description?: string;
    isActive: boolean;
    images: { id: string; url: string }[];
    units: Unit[];
    createdAt: string;
}

export interface Unit {
    id: string;
    unitNumber: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet?: number;
    rentAmount: number;
    depositAmount?: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
    amenities: string[];
    description?: string;
    images: { id: string; url: string }[];
    property?: Property;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const propertiesApi = {
    getAll: (params?: { page?: number; limit?: number; city?: string }) =>
        api.get<PaginatedResponse<Property>>('/properties', { params }),
    getById: (id: string) => api.get<Property>(`/properties/${id}`),
};

export const unitsApi = {
    getAll: (params?: {
        page?: number;
        limit?: number;
        status?: string;
        minRent?: number;
        maxRent?: number;
        bedrooms?: number;
        propertyId?: string;
    }) => api.get<PaginatedResponse<Unit>>('/units', { params }),
    getById: (id: string) => api.get<Unit>(`/units/${id}`),
    getAvailable: () => api.get<Unit[]>('/units?status=AVAILABLE'),
};

// ========== Applications API ==========
export const applicationsApi = {
    create: (data: { unitId: string; message?: string }) =>
        api.post('/applications', data),
    getMine: () => api.get('/applications/my'),
};

// ========== Payments API ==========
export const paymentsApi = {
    initiate: (data: { amount: number; phone: string; leaseId: string }) =>
        api.post('/payments/initiate', data),
    getHistory: () => api.get('/payments/history'),
};

// ========== Maintenance API ==========
export const maintenanceApi = {
    create: (data: { unitId: string; title: string; description: string; priority: string }) =>
        api.post('/maintenance', data),
    getMine: () => api.get('/maintenance/my'),
};
