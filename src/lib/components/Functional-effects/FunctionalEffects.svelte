<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import ThreeScene from './ThreeScene.svelte';
  import HotspotInfoPanel from './HotspotInfoPanel.svelte';
  import { animalHotspots, humanHotspots, type Hotspot } from '$lib/data/hotspots-data';
  import type { Category } from '$lib/types/three-viewer';
  
  let container: HTMLDivElement;
  let selectedCategory: Category = 'animals';
  let activeIndex = -1;
  let showViewer = false;
  
  // Texture loader
  let textureLoader: THREE.TextureLoader;
  let bgTextures: Record<Category, THREE.Texture>;
  
  $: hotspots = selectedCategory === 'animals' ? animalHotspots : humanHotspots;
  
  onMount(() => {
    // Initialize texture loader
    textureLoader = new THREE.TextureLoader();
    
    // Load background textures
    bgTextures = {
      animals: textureLoader.load("/images/functional-effect-bg.png"),
      humans: textureLoader.load("/images/listening-background.jpg")
    };
    
    // Ensure textures are properly configured
    if (bgTextures) {
      Object.values(bgTextures).forEach(texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
      });
    }
  });
  
  const enter360 = () => {
    showViewer = true;
  };
  
  const handleHotspotClick = (event: CustomEvent) => {
    activeIndex = event.detail.index;
  };
  
  const closePanel = () => {
    activeIndex = -1;
  };
  
  const next = () => {
    activeIndex = (activeIndex + 1) % hotspots.length;
  };
  
  const prev = () => {
    activeIndex = (activeIndex - 1 + hotspots.length) % hotspots.length;
  };
</script>

{#if !showViewer}
<div class="overlay-360" style="display: {showViewer ? 'none' : 'flex'}">
  <div class="overlay-content" on:click={enter360}>
    <img loading="lazy" src="/src/lib/assets/icons/icon-360.svg" alt="360" width="100">
    <span>360<sup>0</sup> Experience</span>
  </div>
</div>
{:else}

<div class="page-header">
  <h1 class="page-title">Functional Effects</h1>
  <div class="sub-title">
    THE BEHAVIORAL, PHYSIOLOGICAL, AND ECOLOGICAL CONSEQUENCES OF NOISE
  </div>
  <div class="page-blurb">
    <p class="blurb-desc">
      When these effects are combined with other stressors such as winter weather, disease,
      and food shortages, functional effects of noise can have a big impact on the health
      and vitality of wildlife populations within a park.
    </p>
    <div class="switch-field">
      <input type="radio" id="switch_left" name="effects" value="animals" bind:group={selectedCategory}>
      <label for="switch_left">
        <img src="/icons/icon-animals.svg" alt="Animals icon">
        Effects on animals
      </label>
      
      <input type="radio" id="switch_right" name="effects" value="humans" bind:group={selectedCategory}>
      <label for="switch_right">
        Effects on humans
        <img src="/icons/icon-humans.svg" alt="Humans icon">
      </label>
    </div>
  </div>
</div>

<div bind:this={container} class="viewer">
  {#if bgTextures && bgTextures[selectedCategory]}
    <ThreeScene
      {container}
      {hotspots}
      backgroundTexture={bgTextures[selectedCategory]}
      {selectedCategory}
      on:hotspotclick={handleHotspotClick}
    />
  {:else}
    <div class="loading-texture">
      <p>Loading textures...</p>
    </div>
  {/if}
</div>
{/if}

{#if activeIndex > -1}
  {@const item = hotspots[activeIndex]}
  <HotspotInfoPanel
    hotspot={item}
    {selectedCategory}
    totalHotspots={hotspots.length}
    currentIndex={activeIndex}
    on:close={closePanel}
    on:next={next}
    on:prev={prev}
  />
{/if}

<style>
  .viewer {
    width: 100%;
    height: 600px;
    position: relative;
    background: #000;
  }
  
  .loading-texture {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 18px;
  }
  
  .three-scene {
    width: 100%;
    height: 100%;
  }
  /* 360 Overlay */
  .overlay-360 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
  }

  .overlay-content {
    text-align: center;
    color: white;
  }

  .overlay-content img {
    margin-bottom: 20px;
    animation: pulse 2s infinite;
  }

  .overlay-content span {
    font-size: 24px;
    font-weight: bold;
    display: block;
  }

  .overlay-content sup {
    font-size: 14px;
    vertical-align: super;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }




/* Fullscreen 360° viewer */
.viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}

.viewer:active {
  cursor: grabbing;
}

  /* Page header */
  .page-header {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    z-index: 5000;
    color: white;
    max-width: 670px;
    margin: 0 auto;
    pointer-events: none;
  }

  .page-title {
    font-size: 52px;
    font-weight: 800;
    margin-bottom: 10px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.1em;
  }

  .sub-title {
    font-size: 15px;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-weight: bold;
  }

  .page-blurb {
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 8px;
    pointer-events: auto;
    max-width: 570px;
    margin: 0 auto;
    text-align: center;
  }

  .blurb-desc {
    margin-bottom: 20px;
    line-height: 1.5;
    font-size: 16px;
  }

  /* Toggle switch */
  .switch-field {
    display: flex;
    background: rgba(197, 197, 197, 1);
    border-radius: 30px;
    padding: 0;
    max-width: 440px;
    margin: 0 auto;
    overflow: hidden;
  }

  .switch-field input {
    display: none;
  }

  .switch-field label {
    flex: 1;
    padding: 10px 30px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    height: 33px;
    color: white;
  }

  .switch-field label:first-of-type {
    border-radius: 30px 0 0 30px;
    padding-left: 30px;
  }

  .switch-field label:last-of-type {
    border-radius: 0 30px 30px 0;
    padding-right: 30px;
  }

  .switch-field input:checked + label {
    background: #000;
    color: white;
  }

  .switch-field label img {
    width: 26px;
    height: 26px;
  }
  /* Info panel */
  .info-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1226px;
    height: 580px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    transition: opacity 0.3s ease;
  }
.photo-wrapper {
    width: 782px;
    height: 580px;
    flex-shrink: 0;
    background: #f5f5f5;
  }

  .photo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-wrapper {
    width: 444px;
    height: 580px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    background: white;
  }

  .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 10;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 50%;
    transition: background 0.3s;
  }

  .close-icon:hover {
    background: #e0e0e0;
  }

  .close-icon img {
    width: 16px;
    height: 16px;
  }

  .upper-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
  }

  .upper-content h2 {
    font-size: 30px;
    margin-bottom: 15px;
    color: #333;
    text-transform: uppercase;
    padding-bottom: 10px;
    border-bottom: 2px solid #C5C5C5;
    font-family: 'Coda', sans-serif;
  }

  .upper-content p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 30px;
    color: #666;
  }

  .upper-content p em {
    font-weight: 300;
    font-style: italic;
    color: #888;
  }

  .upper-content h3 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #333;
    font-weight: 700;
    text-transform: uppercase;
  }

  .upper-content ul {
    list-style: none;
    display: flex;
    gap: 15px;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
  }

  .upper-content ul.humans {
    justify-content: flex-start;
  }

  .upper-content ul.humans li {
    margin-right: 20px;
  }

  .upper-content ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 70px;
    font-size: 11px;
    text-transform: uppercase;
    color: #999;
    text-align: center;
    font-weight: 700;
  }

  .upper-content ul li.active {
    color: #333;
  }

  .upper-content ul li.active.icon-mating {
    color: #D8400B;
  }

  .upper-content ul li.active.icon-habitat-patterns {
    color: #2970C0;
  }

  .upper-content ul li.active.icon-hunting {
    color: #FFB300;
  }

  .upper-content ul li.active.icon-predator-avoidance {
    color: #509917;
  }

  .upper-content ul li.active.icon-benefit {
    color: #509917;
  }

  .upper-content ul li.active.icon-negative {
    color: #D8400B;
  }

  .upper-content ul li img {
    width: 60px;
    height: 60px;
    padding: 12px;
    background: #E0E0E0;
    border-radius: 50%;
    transition: all 0.3s;
  }

  .upper-content ul li.active.icon-mating img {
    background: #D8400B;
  }

  .upper-content ul li.active.icon-habitat-patterns img {
    background: #2970C0;
  }

  .upper-content ul li.active.icon-hunting img {
    background: #FFB300;
  }

  .upper-content ul li.active.icon-predator-avoidance img {
    background: #509917;
  }

  .upper-content ul li.active.icon-benefit img {
    background: #509917;
  }

  .upper-content ul li.active.icon-negative img {
    background: #D8400B;
  }

  /* Navigation buttons */
  .lower-content {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    height: 100px;
  }

  .third {
    flex: 1;
    height: 100%;
  }

  .btn-pano-close,
  .progress-button {
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding: 0;
    border-radius: 5px;
  }

  .btn-pano-close {
    background: #C5C5C5;
    color: #333;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
  }

  .btn-pano-close:hover {
    background: #B0B0B0;
  }

  .btn-pano-close img {
    width: 24px;
    height: 22px;
  }

  .progress-button {
    background: transparent;
    position: relative;
    border: 2px solid #E0E0E0;
  }

  .progress-button:hover {
    border-color: #C5C5C5;
  }

  .progress-button:hover .img {
    transform: scale(1.05);
  }

  .progress-button .control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 35px;
    height: 35px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: background 0.3s;
  }

  .progress-button .control:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .progress-button .control:first-child {
    left: 10px;
  }

  .progress-button .control:last-child {
    right: 10px;
  }

  .progress-button .control img {
    width: 18px;
    height: 18px;
    filter: invert(1);
  }

  .progress-button .img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
  }

  .progress-button .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


/* Hotspot scaling */
.mesh-hover {
  transform: scale(1.2);
  transition: transform 0.2s;
}

/* Responsive adjustments */
@media(max-width: 768px){
  .info-panel {
    flex-direction: column;
    width: 90%;
  }
  .photo-wrapper {
    max-width: 100%;
    height: 200px;
  }
  .content-wrapper {
    padding: 12px;
  }
  .lower-content {
    flex-direction: column;
    gap: 8px;
  }
}


</style>


