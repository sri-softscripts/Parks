<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { HumanItem } from '$lib/types';
  
  export let data: HumanItem;
  export let prevItem: HumanItem | undefined;
  export let nextItem: HumanItem | undefined;
  
  const dispatch = createEventDispatcher<{
    close: void;
    navigate: string;
  }>();
  
  function handleClose() {
    dispatch('close');
  }
  
  function navigateTo(itemId: string) {
    dispatch('navigate', itemId);
  }
  
  // Image optimization
  const imageSrcset = `${data.image} 1x, ${data.image.replace('@2x', '@3x') || data.image} 2x`;
</script>

<div 
  class="info-panel human {data.id}" 
  id={data.id}
  role="dialog"
  aria-modal="true"
  aria-labelledby={`panel-title-${data.id}`}
  transition:fly={{ y: 50, duration: 300 }}
  on:keydown={(e) => e.key === 'Escape' && handleClose()}
  tabindex="-1"
>
  <div class="photo-wrapper">
    <img
      src={data.image}
      alt={data.title}
      srcset={imageSrcset}
      loading="eager"
      width="782"
      height="580"
      fetchpriority="high"
    />
  </div>
  
  <div class="content-wrapper">
    <!-- Close Button -->
    <button 
      class="back-to-panolens close-icon" 
      on:click={handleClose}
      aria-label="Close panel"
    >
      <img 
        src="/icons/closeX.svg" 
        alt="Close" 
        width="16" 
        height="16"
        loading="eager"
      />
    </button>
    
    <!-- Upper Content -->
    <div class="upper-content">
      <h2 id={`panel-title-${data.id}`}>{data.title}</h2>
      <p>{data.description} <em>({data.citation})</em></p>
      
      <!-- Human Effect Type -->
      <ul class="humans" role="list">
        <li 
          class="icon-{data.effectType.type} active"
          style="--effect-color: {data.effectType.color}"
        >
          <img 
            src={data.effectType.icon} 
            alt={data.effectType.label}
            width="56"
            height="56"
            loading="lazy"
          />
          <span class="effect-label">{data.effectType.label}</span>
        </li>
      </ul>
    </div>
    
    <!-- Lower Content - Navigation -->
    <div class="lower-content">
      <!-- Back to Panorama -->
      <div class="third back back-to-panolens">
        <button 
          class="btn-pano-close" 
          on:click={handleClose}
          aria-label="Back to 360° Experience"
        >
          <img 
            src="/icons/back-360.svg" 
            alt="Back" 
            width="20"
            height="18"
            loading="lazy"
          />
          Back to 360° <br>Experience
        </button>
      </div>
      
      <!-- Previous Item -->
      {#if prevItem}
        <div class="third">
          <button 
            class="progress-button" 
            on:click={() => navigateTo(prevItem.id)}
            aria-label={`Go to previous: ${prevItem.title}`}
            data-target={prevItem.id}
          >
            <div class="control">
              <img 
                src="/icons/arrow-left.svg" 
                alt="Previous" 
                width="16"
                height="33"
                loading="lazy"
              />
            </div>
            <div class="img">
              <img 
                src={prevItem.thumb} 
                alt={prevItem.title}
                loading="lazy"
                width="100"
                height="134"
              />
            </div>
          </button>
        </div>
      {/if}
      
      <!-- Next Item -->
      {#if nextItem}
        <div class="third">
          <button 
            class="progress-button" 
            on:click={() => navigateTo(nextItem.id)}
            aria-label={`Go to next: ${nextItem.title}`}
            data-target={nextItem.id}
          >
            <div class="control">
              <img 
                src="/icons/arrow-right.svg" 
                alt="Next" 
                width="16"
                height="33"
                loading="lazy"
              />
            </div>
            <div class="img">
              <img 
                src={nextItem.thumb} 
                alt={nextItem.title}
                loading="lazy"
                width="100"
                height="134"
              />
            </div>
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Reuse most styles from AnimalInfoPanel */
  .info-panel {
    position: fixed;
    display: flex;
    width: 1226px;
    max-width: 90vw;
    height: 580px;
    max-height: 90vh;
    min-width: 200px;
    min-height: 250px;
    background: #fff;
    color: #000;
    border-radius: 3px;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 20000;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    outline: none;
  }
  
  .photo-wrapper {
    width: 782px;
    height: 580px;
    flex-shrink: 0;
  }
  
  .photo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .content-wrapper {
    width: 444px;
    height: 580px;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .close-icon {
    position: absolute;
    line-height: 1;
    width: 32px;
    height: 32px;
    right: 37px;
    top: 37px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border: none;
    padding: 0;
    transition: background 0.3s ease;
  }
  
  .close-icon:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  
  .close-icon img {
    display: block;
  }
  
  .upper-content {
    position: relative;
    padding: 37px 20px 0;
    flex: 1;
  }
  
  .upper-content h2 {
    font-family: "Coda", sans-serif;
    font-size: 1.875em;
    padding-bottom: 10px;
    border-bottom: 1px solid #C5C5C5;
    color: #575757;
    text-transform: uppercase;
    margin: 0 0 20px;
  }
  
  .upper-content p {
    font-size: 0.875em;
    line-height: 1.35714em;
    font-weight: 400;
    margin: 0 0 40px;
    min-height: 120px;
    color: #333;
  }
  
  .upper-content p em {
    font-weight: 300;
    font-style: italic;
  }
  
  .humans {
    display: flex;
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    justify-content: flex-start !important;
    flex-direction: row;
    width: 100%;
  }
  
  .humans li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #C5C5C5;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    font-size: 0.625em;
    text-transform: uppercase;
    color: #C5C5C5;
    text-align: center;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
    transition: all 0.3s ease;
    margin-right: 20px;
  }
  
  .humans li.active {
    color: white !important;
    background-color: var(--effect-color) !important;
  }
  
  .humans li img {
    width: 56px;
    height: 56px;
    padding: 20%;
    margin-bottom: 8px;
    filter: brightness(0) invert(1);
  }
  
  .humans li.active img {
    filter: brightness(0) invert(1);
  }
  
  .effect-label {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.6em;
    color: #575757;
  }
  
  .lower-content {
    position: relative;
    bottom: 20px;
    padding: 0;
    margin: 0 20px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
  
  .third {
    position: relative;
    display: block;
    width: 100%;
    height: 134px;
    overflow: hidden;
  }
  
  .third.back {
    cursor: pointer;
    display: flex;
    background: #C5C5C5;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    transition: background 0.3s ease;
  }
  
  .third.back:hover {
    background: #B0B0B0;
  }
  
  .third.back button {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    background: transparent;
    justify-content: center;
    color: #575757;
    font-size: 0.625em;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    outline: 0;
    border: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  
  .third.back button img {
    width: 20px;
    height: 18px;
    margin-bottom: 10px;
  }
  
  .progress-button {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    border-radius: 3px;
    transition: transform 0.3s ease;
  }
  
  .progress-button:hover {
    transform: scale(1.05);
  }
  
  .progress-button .control {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .progress-button:hover .control {
    opacity: 1;
  }
  
  .progress-button .control img {
    position: relative;
    display: block;
    width: 16px;
    height: 33px;
    filter: brightness(0) invert(1);
  }
  
  .progress-button .img {
    width: 100%;
    height: 100%;
  }
  
  .progress-button .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .info-panel {
      width: 90%;
      height: auto;
      flex-direction: column;
    }
    
    .photo-wrapper {
      width: 100%;
      height: 300px;
    }
    
    .content-wrapper {
      width: 100%;
      height: auto;
      max-height: 60vh;
    }
    
    .lower-content {
      flex-wrap: wrap;
    }
    
    .third {
      flex: 1;
      min-width: 100px;
    }
  }
  
  @media (max-width: 768px) {
    .info-panel {
      max-width: 95vw;
      max-height: 95vh;
    }
    
    .photo-wrapper {
      height: 200px;
    }
    
    .upper-content h2 {
      font-size: 1.5em;
    }
    
    .humans li {
      width: 50px;
      height: 50px;
    }
    
    .humans li img {
      width: 50px;
      height: 50px;
    }
    
    .effect-label {
      font-size: 0.5em;
      bottom: -20px;
    }
    
    .lower-content {
      flex-direction: column;
    }
    
    .third {
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>