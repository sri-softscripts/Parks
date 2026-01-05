<script lang="ts">
  import { onMount } from 'svelte';
  import DesktopSVG from './DesktopSVG.svelte';
  
  let isMobileOrTablet = false;
  let userAgent = '';
  
  onMount(() => {
    // Check screen size and user agent
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgentString = navigator.userAgent.toLowerCase();
      userAgent = navigator.userAgent;
      
      // Common mobile/tablet detection
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      isMobileOrTablet = 
        width <= 1024 || 
        mobileRegex.test(userAgentString) || 
        isTouchDevice;
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  });
</script>

{#if isMobileOrTablet}
  <div class="desktop-only-message" role="alert" aria-live="polite">
    <DesktopSVG />
    <div class="message-content">
      <h1>NATIONAL PARK SERVICE</h1>
      <p class="partnership">In partnership with Penn State University</p>
      <div class="experience-message">
        <p>For the best experience,</p>
        <p>please view on a desktop.</p>
      </div>
      <button 
        class="got-it-btn" 
        on:click={() => isMobileOrTablet = false}
        aria-label="Got it, continue to mobile view"
      >
        GOT IT
      </button>
      <p class="powered-by">POWERED BY HIKER</p>
    </div>
  </div>
{:else}
  <slot />
{/if}

<style>
  .desktop-only-message {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .message-content {
    max-width: 500px;
    margin-top: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  
  .partnership {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
    color: #a8dadc;
  }
  
  .experience-message {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
    margin: 2rem 0;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .experience-message p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
    color: #f1faee;
  }
  
  .got-it-btn {
    background: #e63946;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    margin: 2rem 0;
    transition: all 0.3s ease;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .got-it-btn:hover {
    background: #ff6b6b;
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(230, 57, 70, 0.4);
  }
  
  .got-it-btn:focus {
    outline: 3px solid #a8dadc;
    outline-offset: 3px;
  }
  
  .powered-by {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-top: 1rem;
    color: #a8dadc;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .experience-message p {
      font-size: 1.2rem;
    }
    
    .got-it-btn {
      padding: 0.8rem 2.5rem;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }
    
    .message-content {
      padding: 0 1rem;
    }
  }
</style>