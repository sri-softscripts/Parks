<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import DesktopOnly from '$lib/components/DesktopOnly.svelte';

</script>
<svelte:head>
  <link rel="icon" href="/favicon.svg" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">

  <!-- Legacy CSS (temporary) -->
  <link rel="stylesheet" href="src/lib/styles/app.css" />
  <link rel="stylesheet" href="src/lib/styles/banner.css" />
  <link rel="stylesheet" href="src/lib/styles/banner-styles.css" />
  <link rel="stylesheet" href="src/lib/styles/css.css" />
  <link rel="stylesheet" href="src/lib/styles/iconochive.css" />
  <!-- <link rel="stylesheet" href="/css/slick.css" /> -->
</svelte:head>


<Header />

<main>
  <slot /> <!-- This renders the routed page -->
</main>

<style>
main {
  padding-top: 75px; /* avoid header overlap */
}
</style>


