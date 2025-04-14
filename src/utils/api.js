const api = (() => {
    const BASE_URL = 'https://forum-api.dicoding.dev/v1';
  
    async function _fetchWithAuth(url, options = {}) {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    }
  
    function putAccessToken(token) {
      localStorage.setItem('accessToken', token);
    }
  
    function getAccessToken() {
      return localStorage.getItem('accessToken');
    }
  
    async function register({ name, email, password }) {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      const responseJson = await response.json();
      const { status, message } = responseJson;
  
      if (status !== 'success') {
        throw new Error(message);
      }
  
      const { data: { user } } = responseJson;
  
      return user;
    }
  
    async function login({ email, password }) {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const responseJson = await response.json();
  
      const { status, message } = responseJson;
  
      if (status !== 'success') {
        throw new Error(message);
      }
  
      const { data: { token } } = responseJson;
  
      return token;
    }
  
    async function getOwnProfile() {
      const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
  
      const responseJson = await response.json();
  
      const { status, message } = responseJson;
  
      if (status !== 'success') {
        throw new Error(message);
      }
  
      const { data: { user } } = responseJson;
  
      return user;
    }
  
    async function getAllUsers() {
      const response = await fetch(`${BASE_URL}/users`);
  
      const responseJson = await response.json();
  
      const { status, message } = responseJson;
  
      if (status !== 'success') {
        throw new Error(message);
      }
  
      const { data: { users } } = responseJson;
  
      return users;
    }
  
    return {
      putAccessToken,
      getAccessToken,
      register,
      login,
      getOwnProfile,
      getAllUsers,
    };
  })();
  
  export default api;
  