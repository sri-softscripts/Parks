<script lang="ts">
  import { onMount } from 'svelte';
  
  export let src: string;
  export let alt: string = '';
  export let width: number | undefined;
  export let height: number | undefined;
  export let className: string = '';
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let priority: boolean = false;
  
  let imageSrc = src;
  let imageSrcSet = '';
  let sizes = '';
  
  onMount(() => {
    // Only generate srcset for images in static folder
    if (src.startsWith('/images/')) {
      const breakpoints = [320, 640, 768, 1024, 1280, 1536];
      imageSrcSet = breakpoints
        .map(bp => `${src}?width=${bp} ${bp}w`)
        .join(', ');
      
      sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    
    // If priority is true, use eager loading
    if (priority) {
      loading = 'eager';
    }
  });
</script>

<img
  {src}
  {alt}
  {width}
  {height}
  {loading}
  class={className}
  srcset={imageSrcSet || undefined}
  {sizes}
  decoding="async"
  fetchpriority={priority ? 'high' : 'auto'}
  on:error={(e) => console.error('Image failed to load:', src)}
/>