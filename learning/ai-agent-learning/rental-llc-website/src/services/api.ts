import type { Property, Showing, Availability, ApplicationForm, ContactForm } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const api = {
    properties: {
        getAll: async (): Promise<Property[]> => {
            const response = await fetch(`${API_BASE_URL}/properties`);
            if (!response.ok) throw new Error('Failed to fetch properties');
            return response.json();
        },
        getById: async (id: string): Promise<Property> => {
            const response = await fetch(`${API_BASE_URL}/properties/${id}`);
            if (!response.ok) throw new Error('Failed to fetch property');
            return response.json();
        },
        create: async (data: Omit<Property, 'id'>): Promise<Property> => {
            const response = await fetch(`${API_BASE_URL}/properties`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create property');
            return response.json();
        },
        update: async (id: string, data: Partial<Property>): Promise<Property> => {
            const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update property');
            return response.json();
        },
        delete: async (id: string): Promise<void> => {
            const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to delete property');
        },
    },
    showings: {
        getAll: async (status?: string): Promise<Showing[]> => {
            const url = status
                ? `${API_BASE_URL}/showings?status=${status}`
                : `${API_BASE_URL}/showings`;
            const response = await fetch(url, { headers: getHeaders() });
            if (!response.ok) throw new Error('Failed to fetch showings');
            return response.json();
        },
        create: async (data: Partial<Showing>): Promise<Showing> => {
            const response = await fetch(`${API_BASE_URL}/showings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to schedule showing');
            return response.json();
        },
        updateStatus: async (id: string, status: string, notes?: string): Promise<Showing> => {
            const response = await fetch(`${API_BASE_URL}/showings/${id}/status`, {
                method: 'PATCH',
                headers: getHeaders(),
                body: JSON.stringify({ status, notes }),
            });
            if (!response.ok) throw new Error('Failed to update showing status');
            return response.json();
        },
        getAvailableSlots: async (propertyId: string, date: string): Promise<{ time: string; value: string; duration: number }[]> => {
            const response = await fetch(`${API_BASE_URL}/showings/property/${propertyId}/available-slots?date=${date}`);
            if (!response.ok) throw new Error('Failed to fetch available slots');
            return response.json();
        },
    },
    availability: {
        getByProperty: async (propertyId: string): Promise<Availability[]> => {
            const response = await fetch(`${API_BASE_URL}/availability/property/${propertyId}`, {
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch availability');
            return response.json();
        },
        create: async (data: Partial<Availability>): Promise<Availability> => {
            const response = await fetch(`${API_BASE_URL}/availability`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create availability');
            return response.json();
        },
        update: async (id: string, data: Partial<Availability>): Promise<Availability> => {
            const response = await fetch(`${API_BASE_URL}/availability/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update availability');
            return response.json();
        },
        delete: async (id: string): Promise<void> => {
            const response = await fetch(`${API_BASE_URL}/availability/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to delete availability');
        },
    },
    contact: {
        submit: async (data: ContactForm): Promise<void> => {
            // Mock submission for now as there's no backend endpoint yet
            console.log('Contact form submitted:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    },
    applications: {
        submit: async (data: ApplicationForm): Promise<void> => {
            // Mock submission for now
            console.log('Application submitted:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};
