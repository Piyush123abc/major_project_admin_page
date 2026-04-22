import axios from 'axios';

// ─── CONFIGURATION ───
// Edit this constant directly for your Vercel deployment
const DEFAULT_API_URL = 'https://intershifting-heterogonously-angella.ngrok-free.dev';

export const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        // This allows you to change the URL on the fly in the browser:
        // Open Console -> localStorage.setItem('customApiUrl', 'https://your-api.com')
        return localStorage.getItem('customApiUrl') || DEFAULT_API_URL;
    }
    return DEFAULT_API_URL;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

// REQUEST INTERCEPTOR: Attach the Access Token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        config.baseURL = getBaseUrl();
        const token = localStorage.getItem('access_token');
        
        // Bypass ngrok browser warning
        config.headers['ngrok-skip-browser-warning'] = 'true';

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

// RESPONSE INTERCEPTOR: Auto-Refresh Logic
api.interceptors.response.use(
    (response) => response, // If successful, just return the data
    async (error) => {
        const originalRequest = error.config;

        // If it's a 401 (Unauthorized) AND we haven't already tried refreshing this specific request
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Set a flag so we don't infinitely loop

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken) {
                    // Use standard axios (NOT our 'api' instance) to avoid triggering interceptors again
                    const response = await axios.post(`${getBaseUrl()}/user/login/refresh/`, {
                        refresh: refreshToken,
                    });

                    // 1. Save the new access token
                    const newAccessToken = response.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    // If the backend sent a new refresh token too, update it
                    if (response.data.refresh) {
                        localStorage.setItem('refresh_token', response.data.refresh);
                    }

                    // 2. Update the failed request with the new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // 3. Retry the original request seamlessly!
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If the refresh token request ALSO fails (e.g., 7 days passed), wipe storage and kick out.
                console.warn("Refresh token expired or invalid. Kicking to login.");
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        // If it's a 401 and there's no refresh token at all, kick to login
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            if (typeof window !== 'undefined' &&
                window.location.pathname !== '/login' &&
                window.location.pathname !== '/') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;