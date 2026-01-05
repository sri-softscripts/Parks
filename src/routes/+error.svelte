<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let errorMessage = '';
  
  onMount(() => {
    // You can add error tracking here
    console.error('Page error:', $page.status, $page.error);
  });
</script>

<svelte:head>
  <title>Error - National Park Service</title>
</svelte:head>

<div class="error-container">
  <h1>Oops! Something went wrong</h1>
  <p>We're having trouble loading this page.</p>
  
  {#if $page.status === 404}
    <p>The page you're looking for doesn't exist.</p>
  {:else if $page.error}
    <p>Error: {$page.error.message}</p>
  {/if}
  
  <a href="/" class="home-link">Return to Home</a>
</div>

<style>
  .error-container {
    text-align: center;
    padding: 4rem 2rem;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  h1 {
    color: #e63946;
    margin-bottom: 1rem;
  }
  
  .home-link {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background: #2d5e52;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  .home-link:hover {
    background: #1a3c34;
  }
</style>