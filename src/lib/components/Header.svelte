<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { fly } from 'svelte/transition';

  // Track which pages should have animation
  const animatedPages = ['spectrogram', 'physics-of-sound', 'functional-effects'];
  
  // Store to control animation
  let shouldAnimate = false;
  let currentPage = $page.url.pathname;

  const menu = [
    { slug: "", label: "Introduction" },
    { slug: "physics-of-sound", label: "Physics of Sound" },
    { slug: "spectrogram", label: "Spectrogram" },
    { slug: "functional-effects", label: "Functional Effects" },
    { slug: "listening-area", label: "Listening Area" },
    { slug: "tips", label: "Tips" },
    { slug: "review", label: "Review" },
    { slug: "learn-more", label: "Learn More" },
  ];

  async function handleNavigation(slug: string) {
    const targetPath = `/${slug}`;
    
    // Check if target page should have animation
    const isAnimatedPage = animatedPages.includes(slug);
    
    if (isAnimatedPage) {
      // Reset scroll and trigger animation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Add a small delay for scroll
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Navigate
      goto(targetPath);
      
      // Add animation class to body or specific element
      document.body.classList.add('page-transition-animated');
      
      // Remove class after animation completes
      setTimeout(() => {
        document.body.classList.remove('page-transition-animated');
      }, 900); // Match animation duration
    } else {
      // Standard navigation for non-animated pages
      goto(targetPath);
    }
  }
</script>

<header class="site-header">
  <div class="site-header__inner">
    <a class="branding" href="/" on:click|preventDefault={() => goto("/")}>
      <img
        src="/images/logo@2x.png"
        alt="National Park Service logo"
      />
      <p>
        National Park Service
        <small>In partnership with Penn State University</small>
      </p>
    </a>

    <nav class="site-header__menu" aria-label="Main navigation">
      <ul class="navbar-nav">
        {#each menu as item}
          <li
            class="navbar-nav__item"
            class:is-active={$page.url.pathname === `/${item.slug}`}
          >
            <a
              href={`/${item.slug}`}
              on:click|preventDefault={() => handleNavigation(item.slug)}
              class={animatedPages.includes(item.slug) ? 'animated-page-link' : ''}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<!-- Add this CSS for animations -->
<style>
  /* Animation for specific pages */
  .page-transition-animated main > * {
    animation: pageFlyIn 600ms ease-out 300ms both;
  }

  @keyframes pageFlyIn {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Existing styles... */
  .site-header {
    z-index: 1000;
    background-color: #ffffff;
  }

  @media (min-width: 1025px) {
    .site-header {
      position: fixed;
      width: 100%;
    }
  }

  .site-header__inner {
    height: 76px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1025px) {
    .site-header__inner {
      width: 1280px;
      margin: 0 auto;
    }
  }

  .site-header .branding {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000000;
  }

  @media (min-width: 1025px) {
    .site-header .branding {
      padding-right: 35px;
      border-right: 1px solid #c5c5c5;
    }
  }

  .site-header .branding img {
    width: 33px;
    height: 44px;
    margin-right: 13px;
  }

  .site-header .branding p {
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.24em;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }

  .site-header .branding p small {
    display: block;
    font-size: 9px;
    line-height: 12px;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #8d8d8d;
  }

  .site-header__menu {
    display: none;
  }

  @media (min-width: 1025px) {
    .site-header__menu {
      flex: 1;
      display: block;
    }
  }

  .site-header__menu .navbar-nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
    counter-reset: step-counter;
  }

  .site-header__menu .navbar-nav__item {
    text-align: center;
    position: relative;
    margin: 0 1px;
    list-style: none;
    width: 100%;
  }

  .site-header__menu .navbar-nav__item:hover a {
    color: #575757;
  }

  .site-header__menu .navbar-nav__item.is-active a {
    color: #575757;
    border-bottom-color: #db592c;
    font-weight: 800;
  }

  .site-header__menu .navbar-nav a {
    font-size: 8px;
    font-weight: 700;
    color: #c5c5c5;
    text-transform: uppercase;
    transition: all 150ms ease;
    text-decoration: none;
    letter-spacing: 0.05em;
    display: block;
    padding-bottom: 10px;
    border-bottom: 2px solid #c5c5c5;
  }

  .site-header__menu .navbar-nav a::before {
    font-family: "Coda-n8", "Coda", sans-serif;
    content: counter(step-counter) ".";
    counter-increment: step-counter;
    display: block;
    font-size: 10px;
    margin-bottom: 2px;
    font-weight: 800;
  }
</style>