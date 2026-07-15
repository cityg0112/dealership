// This function ensures images load correctly whether they are 
// external URLs, base64 strings, or paths from our backend server.
export const getImageUrl = (path) => {
  if (!path) return '';
  
  // If it's already a full web URL (http/https) or a base64 string, return as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Otherwise, it's a relative path from the backend (e.g., /uploads/image.jpg)
  // Prepend the backend URL so the browser can find it
  return `http://localhost:5001${path}`;
};