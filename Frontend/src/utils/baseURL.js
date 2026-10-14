// Set VITE_API_BASE_URL to the backend's origin, e.g. https://croptivize-backend.vercel.app
export const baseURL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api`;
