<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let alt = '';
  export let width: number | undefined;
  export let height: number | undefined;
  export let className = '';
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let priority = false;

  let imageSrcSet = '';
  let sizes = '';

  // fallback values (prevents CLS)
  const FALLBACK_WIDTH = 800;
  const FALLBACK_HEIGHT = 600;

  $: imgWidth = width ?? FALLBACK_WIDTH;
  $: imgHeight = height ?? FALLBACK_HEIGHT;

  onMount(() => {
    if (src.startsWith('/images/')) {
      const breakpoints = [320, 640, 768, 1024, 1280, 1536];
      imageSrcSet = breakpoints
        .map(bp => `${src}?width=${bp} ${bp}w`)
        .join(', ');

      sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }

    if (priority) loading = 'eager';
  });
</script>

<img
  src={src}
  alt={alt}
  width={imgWidth}
  height={imgHeight}
  loading={loading}
  class={className}
  srcset={imageSrcSet || undefined}
  sizes={sizes || undefined}
  decoding="async"
  fetchpriority={priority ? 'high' : 'auto'}
/>
