import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Load functional effects data
    const response = await fetch('/api/functional-effects.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      functionalEffects: data,
      seo: {
        title: 'Functional Effects - National Park Service',
        description: data.description,
        keywords: 'noise, wildlife, behavior, effects, animals, humans, national parks'
      }
    };
  } catch (err) {
    console.error('Error loading functional effects data:', err);
    throw error(500, 'Unable to load functional effects data. Please try again later.');
  }
};