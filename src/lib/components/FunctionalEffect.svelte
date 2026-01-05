<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import AnimalInfoPanel from './AnimalInfoPanel.svelte';
  import HumanInfoPanel from './HumanInfoPanel.svelte';
  import type { FunctionalEffectsData, Section, AnimalItem, HumanItem } from '$lib/types';
  
  export let data: FunctionalEffectsData;
  
  // State
  let activeSection: 'animals' | 'humans' = 'animals';
  let activePanelId: string | null = null;
  let show360Overlay = true;
  let showInfoPanel = false;
  
  // Section data
  const animalSection = data.sections.find(s => s.id === 'animals')!;
  const humanSection = data.sections.find(s => s.id === 'humans')!;
  
  // Get active panel data
  $: activePanelData = activePanelId ? 
    (activeSection === 'animals' 
      ? animalSection.items.find(item => item.id === activePanelId) as AnimalItem
      : humanSection.items.find(item => item.id === activePanelId) as HumanItem
    ) : null;
  
  // Get adjacent items for navigation
  $: {
    if (activePanelData && activeSection === 'animals') {
      const animalData = activePanelData as AnimalItem;
      prevItem = animalSection.items.find(item => item.id === animalData.prevItem) as AnimalItem;
      nextItem = animalSection.items.find(item => item.id === animalData.nextItem) as AnimalItem;
    } else if (activePanelData && activeSection === 'humans') {
      const humanData = activePanelData as HumanItem;
      prevItem = humanSection.items.find(item => item.id === humanData.prevItem) as HumanItem;
      nextItem = humanSection.items.find(item => item.id === humanData.nextItem) as HumanItem;
    }
  }
  
  let prevItem: AnimalItem | HumanItem | undefined;
  let nextItem: AnimalItem | HumanItem | undefined;
  
  // Hotspot positions for animals
  const animalHotspots = [
    { id: 'frog', top: '30%', left: '20%' },
    { id: 'bat', top: '25%', left: '70%' },
    { id: 'squirrel', top: '60%', left: '50%' },
    { id: 'songbird', top: '40%', left: '80%' },
    { id: 'pronghorn', top: '70%', left: '30%' }
  ];
  
  // Hotspot positions for humans
  const humanHotspots = [
    { id: 'recovery', top: '25%', left: '25%' },
    { id: 'physical', top: '40%', left: '65%' },
    { id: 'appreciation', top: '60%', left: '75%' },
    { id: 'peace', top: '35%', left: '50%' },
    { id: 'annoyance', top: '65%', left: '20%' },
    { id: 'disturbance', top: '50%', left: '40%' }
  ];
  
  onMount(() => {
    // Auto-hide overlay after 3 seconds
    const timer = setTimeout(() => {
      if (show360Overlay) {
        show360Overlay = false;
      }
    }, 3000);
    
    // Prevent body scroll when panel is open
    $: {
      if (showInfoPanel) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  });
  
  function openInfoPanel(id: string) {
    activePanelId = id;
    showInfoPanel = true;
  }
  
  function closeInfoPanel() {
    activePanelId = null;
    showInfoPanel = false;
  }
  
  function navigateToItem(itemId: string) {
    if (itemId) {
      activePanelId = itemId;
    }
  }
  
  function switchSection(section: 'animals' | 'humans') {
    if (activeSection !== section) {
      activeSection = section;
      activePanelId = null;
      showInfoPanel = false;
    }
  }
  
  function getCurrentHotspots() {
    return activeSection === 'animals' ? animalHotspots : humanHotspots;
  }
  
  function getItemById(id: string) {
    return activeSection === 'animals' 
      ? animalSection.items.find(item => item.id === id)
      : humanSection.items.find(item => item.id === id);
  }
  
  // Keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (showInfoPanel && activePanelData) {
      switch (event.key) {
        case 'Escape':
          closeInfoPanel();
          break;
        case 'ArrowLeft':
          if (prevItem) navigateToItem(prevItem.id);
          break;
        case 'ArrowRight':
          if (nextItem) navigateToItem(nextItem.id);
          break;
      }
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<section 
  id="functional-effects" 
  class=""
  aria-label="Functional Effects of Noise"
>
  <div class="page-inner">
    <div class="page-content" class:show-info-panel={showInfoPanel}>
      <!-- 360 Experience Overlay -->
      {#if show360Overlay}
        <div 
          class="overlay-360" 
          transition:fade={{ duration: 300 }}
          on:click={() => show360Overlay = false}
          on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? (show360Overlay = false) : null}
          role="button"
          tabindex="0"
          aria-label="Click to start 360 experience"
        >
          <div class="overlay-content">
            <img 
              src="src/lib/assets/icons/icon-360.svg" 
              alt="360" 
              width="100" 
              height="100"
              loading="eager"
              fetchpriority="high"
            />
            <span>360<sup>0</sup> Experience</span>
          </div>
        </div>
      {/if}
      
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">{data.title}</h1>
        <div class="sub-title">{data.subtitle}</div>
        <div class="page-blurb">
          <p class="blurb-desc">{data.description}</p>
          
          <!-- Section Toggle -->
          <div class="switch-field">
            <input 
              type="radio" 
              id="switch_animals" 
              name="effects" 
              value="animals" 
              checked={activeSection === 'animals'}
              on:change={() => switchSection('animals')}
              aria-label="View effects on animals"
            />
            <label for="switch_animals">
              <img 
                src="src/lib/assets/icons/icon-animals.svg" 
                alt="" 
                width="26" 
                height="26"
                loading="lazy"
              />
              Effects on animals
            </label>
            
            <input 
              type="radio" 
              id="switch_humans" 
              name="effects" 
              value="humans" 
              checked={activeSection === 'humans'}
              on:change={() => switchSection('humans')}
              aria-label="View effects on humans"
            />
            <label for="switch_humans">
              Effects on humans
              <img 
                src="src/lib/assets/icons/icon-humans.svg" 
                alt="" 
                width="26" 
                height="26"
                loading="lazy"
              />
            </label>
          </div>
        </div>
      </div>
      
      <!-- Interactive Background Container -->
      <div class="interactive-container-wrapper">
        <!-- Animals Background -->
        <div 
          id="functional-effects-animals" 
          class="interactive-container {activeSection === 'animals' ? 'active' : ''}"
          style="background-image: url('{animalSection.backgroundImage}');"
          aria-label="Interactive view of animal habitats"
          aria-hidden={activeSection !== 'animals'}
        >
          {#if activeSection === 'animals'}
            {#each getCurrentHotspots() as hotspot}
              {#if getItemById(hotspot.id)}
                <button
                  class="hotspot-button"
                  style="top: {hotspot.top}; left: {hotspot.left};"
                  on:click={() => openInfoPanel(hotspot.id)}
                  on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? openInfoPanel(hotspot.id) : null}
                  aria-label={`Learn about ${getItemById(hotspot.id)?.title}`}
                >
                  <img
                    src={getItemById(hotspot.id)?.thumb}
                    alt=""
                    width="60"
                    height="60"
                    loading="lazy"
                  />
                  <div class="hotspot-ring"></div>
                </button>
              {/if}
            {/each}
          {/if}
        </div>
        
        <!-- Humans Background -->
        <div 
          id="functional-effects-humans" 
          class="interactive-container {activeSection === 'humans' ? 'active' : ''}"
          style="background-image: url('{humanSection.backgroundImage}');"
          aria-label="Interactive view of human environments"
          aria-hidden={activeSection !== 'humans'}
        >
          {#if activeSection === 'humans'}
            {#each getCurrentHotspots() as hotspot}
              {#if getItemById(hotspot.id)}
                <button
                  class="hotspot-button"
                  style="top: {hotspot.top}; left: {hotspot.left};"
                  on:click={() => openInfoPanel(hotspot.id)}
                  on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? openInfoPanel(hotspot.id) : null}
                  aria-label={`Learn about ${getItemById(hotspot.id)?.title}`}
                >
                  <img
                    src={getItemById(hotspot.id)?.thumb}
                    alt=""
                    width="60"
                    height="60"
                    loading="lazy"
                  />
                  <div class="hotspot-ring"></div>
                </button>
              {/if}
            {/each}
          {/if}
        </div>
      </div>
      
      <!-- Info Panels -->
      {#if showInfoPanel && activePanelData}
        <svelte:component
          this={activeSection === 'animals' ? AnimalInfoPanel : HumanInfoPanel}
          data={activePanelData}
          {prevItem}
          {nextItem}
          on:close={closeInfoPanel}
          on:navigate={navigateToItem}
        />
      {/if}
    </div>
    
    <!-- Page Footer -->
    <footer class="page-footer">
      <div class="container">
        <!-- Powered by Hiker -->
        <div class="hiker">
          <a href="http://hikercompany.com/" target="_blank" rel="noopener noreferrer" aria-label="Powered by Hiker">
            <!-- SVG Logo -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.883 19.988" aria-hidden="true" focusable="false">
              <path fill="#fff" d="M19.089,11.132c-.035,0-.088.018-.123.018h0a.746.746,0,0,1-.741-.706,1.829,1.829,0,0,1-.018-.547c.018-.176.035-.353.071-.529.035-.282.071-.582.106-.864V8.362c-.053-.282-.653-.335-1.006-.353-.053,0-.123-.018-.159-.018l-.335,1.817A2.607,2.607,0,0,1,15,11.891c-.088.018-.176.018-.265.035a1.35,1.35,0,0,1-1.288-.759c0,.018,0,.018-.018.035a1.566,1.566,0,0,1-1.217,1.217.859.859,0,0,1-.212.018,1.661,1.661,0,0,1-1.394-.9,3.715,3.715,0,0,1-.476-1.041.2.2,0,0,1,.159-.229c.123-.018,1.27-.247,1.588-.759a.477.477,0,0,0,.071-.406c-.035-.176-.141-.229-.388-.176a2.546,2.546,0,0,0-1.5,1.2l-.529,2.629a.227.227,0,0,1-.176.176.231.231,0,0,1-.247-.176.99.99,0,0,1,.035-.176,1.529,1.529,0,0,1-.847.547c-.053,0-.088.018-.141.018a.75.75,0,0,1-.759-.706,2.151,2.151,0,0,1,.035-.812L7.851,9.58c.018-.088.035-.194.053-.282a.247.247,0,0,1,.212-.159.192.192,0,0,1,.194.176c.018.071-.088.582-.476,2.435a1.618,1.618,0,0,0-.035.635.361.361,0,0,0,.335.353H8.2a1.118,1.118,0,0,0,.635-.459,3.072,3.072,0,0,0,.512-.988c.018-.035.018-.071.035-.106a.515.515,0,0,0,.035-.159v-.018c.37-1.852.935-4.569,1.006-4.852a.233.233,0,0,1,.159-.176.207.207,0,0,1,.247.176c0,.053-.123.67-.512,2.576-.053.212-.088.388-.106.512a2.6,2.6,0,0,1,1.253-.706.724.724,0,0,1,.194-.018.617.617,0,0,1,.688.547c.194,1.059-1.235,1.482-1.764,1.623a.627.627,0,0,0,.071.159c.018.018.018.053.035.071.388.847.864,1.217,1.411,1.129.67-.123.847-.759,1.023-1.394.035-.106.053-.212.088-.318,0-.018,0-.035.018-.035a2.87,2.87,0,0,1,.97-2.152,1.516,1.516,0,0,1,.617-.247c.053,0,.088-.018.141-.018a.74.74,0,0,1,.776.582c.159.9-.882,1.764-1.623,1.905a1.442,1.442,0,0,1-.476.018,1.254,1.254,0,0,0,.335.9,1,1,0,0,0,.9.229,1.953,1.953,0,0,0,1.358-1.182,1.841,1.841,0,0,0,.141-.441c.018-.053.018-.088.035-.141V9.738c.018-.053.018-.123.035-.194.088-.406.247-1.164.282-1.57A.665.665,0,0,1,16.2,7.5a.744.744,0,0,1,.053-.388.457.457,0,0,1,.3-.247.6.6,0,0,1,.635.547A.724.724,0,0,1,17.2,7.6c.106.018.229.018.335.035.053,0,.106.018.159.018.353.053.935.123,1.023.653a.753.753,0,0,1,0,.282c-.035.229-.053.459-.088.706-.035.229-.053.476-.088.706a1.56,1.56,0,0,0,0,.406c.035.141.123.406.37.353.406-.071.706-.547.882-1.023A9.826,9.826,0,0,0,9.95,0,9.984,9.984,0,0,0,0,10a10.415,10.415,0,0,0,.335,2.576A16.2,16.2,0,0,1,2.241,11.22c.353-1.694.547-2.646.653-3.158.123-.635.141-.653.141-.688a.23.23,0,0,1,.176-.159.218.218,0,0,1,.247.159,3.925,3.925,0,0,1-.141.759c0,.035-.018.053-.018.071l-.582,2.787c.159-.088.3-.194.441-.282a4.492,4.492,0,0,1,1.694-.847,1.15,1.15,0,0,1,.988.212l.582-3.052c.018-.053.018-.088.035-.141.018-.035.035-.088.053-.123a1.206,1.206,0,0,1,.882-.688c.035,0,.088-.018.141-.018.176,0,.229.088.229.159a.205.205,0,0,1-.035.176.238.238,0,0,1-.159.088H7.445a.791.791,0,0,0-.635.617L6.563,8.468c-.3,1.623-.617,3.281-.935,4.922a.207.207,0,0,1-.176.159.19.19,0,0,1-.229-.159c-.018-.053.123-.759.459-2.54.018-.141.053-.229.053-.282a.244.244,0,0,1-.053-.071.792.792,0,0,0-.741-.212,3.2,3.2,0,0,0-1.164.512c-.088.053-.194.123-.335.212-.282.176-.635.406-.847.529l-.388,1.905a3.3,3.3,0,0,1-.759,1.747,9.941,9.941,0,0,0,18.436-4.64A1.35,1.35,0,0,1,19.089,11.132ZM8.062,8.186a.3.3,0,0,1,.176-.106.261.261,0,0,1,.3.212.29.29,0,0,1-.212.318H8.292a.253.253,0,0,1-.265-.229A.161.161,0,0,1,8.062,8.186Z"/>
              <path fill="#fff" d="M4.358,67.1a14.739,14.739,0,0,0-1.464,1.059c-.071.053-.123.106-.194.159A9.4,9.4,0,0,0,3.476,70.1a3.306,3.306,0,0,0,.582-1.482Z" transform="translate(-2.224 -55.262)"/>
              <path fill="#fff" d="M79.323,47.322a.519.519,0,0,0-.053-.459.416.416,0,0,0-.441-.123c-.688.141-1.041,1.059-1.129,1.641a1.365,1.365,0,0,0,.37-.018A1.719,1.719,0,0,0,79.323,47.322Z" transform="translate(-63.992 -38.483)"/>
              <path fill="#fff" d="M94.464,40.9h0c-.035,0-.035.071-.018.123a.234.234,0,0,0,.159.123v-.035C94.587,41.041,94.516,40.9,94.464,40.9Z" transform="translate(-77.774 -33.684)"/>
            </svg>
            Powered by Hiker
          </a>
        </div>
        
        <!-- Navigation Button -->
        <button 
          class="button button-down move-to-next" 
          type="button" 
          data-parent="functional-effects" 
          data-target="listening-area"
          aria-label="Go to next section: Listening Area"
        >
          <img 
            src="src/lib/assets/icons/arrow-down.svg" 
            alt="" 
            width="22" 
            height="11"
            loading="lazy"
          />
        </button>
      </div>
    </footer>
  </div>
</section>

<style>
  /* Base styles */
  .page.pano {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #000;
    overflow: hidden;
  }
  
  .page-inner {
    position: relative;
    z-index: 1;
  }
  
  .page-content {
    position: relative;
    min-height: 100vh;
  }
  
  .page-content.show-info-panel::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 1000;
  }
  
  /* 360 Overlay */
  .overlay-360 {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 10000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .overlay-content {
    color: #ffffff;
    text-align: center;
    font-weight: bold;
    letter-spacing: 5px;
    font-size: 18px;
    text-transform: uppercase;
  }
  
  .overlay-content sup {
    font-size: 50%;
    top: -1em;
    position: relative;
  }
  
  .overlay-content img {
    display: block;
    margin: 0 auto 20px;
  }
  
  /* Page Header */
  .page-header {
    position: absolute;
    background: transparent;
    width: 100%;
    height: auto;
    top: 20px;
    left: 0;
    right: 0;
    max-width: 670px;
    margin: auto;
    z-index: 5000;
    pointer-events: none;
  }
  
  .page-header * {
    pointer-events: auto;
  }
  
  .page-title {
    font-size: 52px;
    letter-spacing: 0.1em;
    margin: 0 0 39px;
    font-weight: 800;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    color: #ffffff;
    font-family: 'Coda', sans-serif;
  }
  
  .sub-title {
    font-size: 15px;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
    margin: 0;
    text-transform: uppercase;
  }
  
  .page-blurb {
    font-size: 16px;
    line-height: 22px;
    max-width: 570px;
    margin: 0 auto;
    text-align: center;
    color: #ffffff;
  }
  
  .blurb-desc {
    margin-top: 1.5em;
    margin-bottom: 2em;
  }
  
  /* Switch Field */
  .switch-field {
    max-width: 440px;
    margin: 0 auto;
    font-family: "Open Sans", sans-serif;
    padding: 20px;
    overflow: hidden;
  }
  
  .switch-field input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
  }
  
  .switch-field label {
    display: inline-block;
    position: relative;
    width: 195px;
    height: 33px;
    background-color: #C5C5C5;
    color: #ffffff;
    font-size: 10px;
    line-height: 33px;
    font-weight: 700;
    text-align: center;
    text-shadow: none;
    text-transform: uppercase;
    padding: 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    float: left;
  }
  
  .switch-field label:hover {
    cursor: pointer;
  }
  
  .switch-field input:checked + label {
    background-color: #000000;
    box-shadow: none;
  }
  
  .switch-field label:first-of-type {
    border-radius: 30px 0 0 30px;
    padding-left: 30px;
  }
  
  .switch-field label:first-of-type img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 3px;
  }
  
  .switch-field label:last-of-type {
    border-radius: 0 30px 30px 0;
    padding-right: 30px;
  }
  
  .switch-field label:last-of-type img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
  }
  
  .switch-field label img {
    vertical-align: middle;
  }
  
  /* Interactive Container */
  .interactive-container-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .interactive-container {
    position: absolute;
    width: 100%;
    height: calc(100vh - 200px);
    height: calc(100vh - 76px);
    z-index: 9;
    opacity: 0;
    visibility: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .interactive-container.active {
    z-index: 10;
    opacity: 1;
    visibility: visible;
  }
  
  /* Hotspot Buttons */
  .hotspot-button {
    position: absolute;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transition: transform 0.3s ease;
    z-index: 100;
  }
  
  .hotspot-button:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  .hotspot-button:focus {
    outline: 2px solid #4CAF50;
    outline-offset: 2px;
  }
  
  .hotspot-button img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .hotspot-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
  }
  
  /* Page Footer */
  .page-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: transparent;
    padding: 20px 0;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .hiker a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
  }
  
  .hiker svg {
    width: 20px;
    height: 20px;
  }
  
  .button-down {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .button-down:hover {
    transform: translateY(3px);
  }
  
  .button-down img {
    filter: invert(1);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .page-title {
      font-size: 32px;
    }
    
    .sub-title {
      font-size: 12px;
    }
    
    .page-blurb {
      font-size: 14px;
      padding: 0 20px;
    }
    
    .switch-field {
      max-width: 300px;
    }
    
    .switch-field label {
      width: 140px;
      font-size: 8px;
    }
    
    .interactive-container {
      height: calc(100vh - 150px);
    }
    
    .hotspot-button {
      width: 60px;
      height: 60px;
    }
    
    .hotspot-button img {
      width: 50px;
      height: 50px;
    }
    
    .hotspot-ring {
      width: 60px;
      height: 60px;
    }
    
    .container {
      flex-direction: column;
      gap: 10px;
    }
  }
  
  @media (max-width: 480px) {
    .page-title {
      font-size: 24px;
    }
    
    .switch-field {
      padding: 10px;
    }
    
    .switch-field label {
      width: 120px;
      height: 28px;
      line-height: 28px;
    }
    
    .hotspot-button {
      width: 50px;
      height: 50px;
    }
    
    .hotspot-button img {
      width: 40px;
      height: 40px;
    }
    
    .hotspot-ring {
      width: 50px;
      height: 50px;
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .overlay-360,
    .hotspot-button,
    .button-down {
      transition: none;
    }
    
    .hotspot-ring {
      animation: none;
      display: none;
    }
  }
</style>