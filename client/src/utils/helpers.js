export const getImageUrl = (path) => {
  if (!path) return '';
  
  // If it's already a full web URL or a base64 string, return as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Get the base URL from the environment variable (removes '/api' from the end)
  // Example: turns "https://dealership-1.onrender.com/api" into "https://dealership-1.onrender.com"
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';
  
  // Combine the base URL with the relative path (e.g., "/uploads/car-123.jpg")
  return `${baseUrl}${path}`;
};