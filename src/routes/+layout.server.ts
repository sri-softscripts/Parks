import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
  try {
    // Load your JSON data
    const response = await fetch('/api/data.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      data,
      pathname: url.pathname,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error loading data:', error);
    
    // Return error state
    return {
      data: null,
      error: 'Failed to load page data',
      pathname: url.pathname
    };
  }
};