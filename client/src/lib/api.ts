interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export async function api(endpoint: string, options: ApiOptions = {}) {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`/api${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      // If unauthorized, clear token and reload
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
        return null;
      }

      const error = await response.json();
      throw new Error(error.error || 'Something went wrong');
    }

    return response.json();
  } catch (error: any) {
    throw error;
  }
}
