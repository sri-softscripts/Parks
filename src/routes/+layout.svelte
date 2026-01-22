<script lang="ts">
  import { fly } from 'svelte/transition';
  import { navigating } from '$app/stores';
  import Header from '$lib/components/Header.svelte';
  import DesktopOnly from '$lib/components/DesktopOnly.svelte';

  // Key for triggering transitions on route changes
  $: routeKey = $navigating?.to?.url.pathname || '';
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"> -->

  <!-- Legacy CSS (temporary) -->
  <link rel="stylesheet" href="/styles/app.css" />
  <!-- <link rel="stylesheet" href="/styles/banner.css" /> -->
  <!-- <link rel="stylesheet" href="/styles/banner-styles.css" /> -->
  <!-- <link rel="stylesheet" href="/styles/css.css" /> -->
  <!-- <link rel="stylesheet" href="/styles/iconochive.css" /> -->
  <!-- <link rel="stylesheet" href="/css/slick.css" /> -->
</svelte:head>

<Header />

<main>
  {#key routeKey}
    <div 
      in:fly="{{ y: 700, duration: 400, delay: 100 }}"
      out:fly="{{ y: -10, duration: 0 }}"
      class="page-container"
    >
      <slot /> <!-- This renders the routed page -->
    </div>
  {/key}
</main>

<style>
  main {
    padding-top: 75px; 
    position: relative;
    overflow-x: hidden; 
  }

  .page-container {
    width: 100%;
    min-height: calc(100vh - 75px);
  }

  
  :global(body) {
    overflow-x: hidden;
  }
</style>