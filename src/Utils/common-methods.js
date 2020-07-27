export const isAccessTokenAvailable = () => !!localStorage.getItem("tokens");
export const setAccessToken = (token) => localStorage.setItem("tokens", token);
export const getAccessToken = () => localStorage.getItem("tokens") || {};
export const clearAccessToken = () => localStorage.removeItem("tokens");

export const getHeaders = () => ({
  common: {
    Authorization: `Bearer ${JSON.parse(getAccessToken()).access_token}`,
  },
});
