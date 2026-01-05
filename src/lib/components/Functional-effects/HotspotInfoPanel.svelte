<script lang="ts">
  import type { Hotspot, Category } from '$lib/data/hotspots-data';
  
  export let hotspot: Hotspot;
  export let category: Category;
  export let totalHotspots: number;
  export let currentIndex: number;
  
  // Emit events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  const closePanel = () => dispatch('close');
  const nextHotspot = () => dispatch('next');
  const prevHotspot = () => dispatch('prev');
</script>

<div class="info-panel {category}" id={hotspot.id}>
  <div class="photo-wrapper">
    <img 
      src={hotspot.image} 
      alt={hotspot.title}
      loading="lazy"
      class="hotspot-image"
    />
  </div>
  <div class="content-wrapper">
    <div class="back-to-panolens close-icon" on:click={closePanel}>
      <img 
        src="/icons/closeX.svg" 
        alt="Close"
        width="16"
        height="16"
        loading="lazy"
      />
    </div>
    <div class="upper-content">
      <h2>{hotspot.title}</h2>
      <p>{hotspot.description} <em>{hotspot.citation}</em></p>
      
      {#if category === 'animals' && hotspot.behaviors}
        <h3>Affected Animal Behavior:</h3>
        <ul>
          {#each hotspot.behaviors as b}
            <li class="icon-{b.name.toLowerCase().replace(/\s/g,'-')} {b.active ? 'active' : ''}">
              <img 
                src={b.icon} 
                alt={b.name}
                width="24"
                height="24"
                loading="lazy"
              />
              {b.name}
            </li>
          {/each}
        </ul>
      {:else if category === 'humans' && hotspot.effects}
        <h3>Effects on Humans:</h3>
        <ul>
          {#each hotspot.effects as e}
            <li class="{e.active ? 'active' : ''}">
              <img 
                src={e.icon} 
                alt={e.name}
                width="24"
                height="24"
                loading="lazy"
              />
              {e.name}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="lower-content">
      <div class="third back back-to-panolens">
        <button class="btn-pano-close" on:click={closePanel}>
          <img 
            src="/icons/back-360.svg" 
            alt="Back to 360"
            width="24"
            height="24"
            loading="lazy"
          />
          Back to 360° Experience
        </button>
      </div>
      <div class="third">
        <button class="progress-button" on:click={prevHotspot}>
          <div class="control">
            <img 
              src="/icons/arrow-left.svg" 
              alt="Previous"
              width="16"
              height="16"
              loading="lazy"
            />
          </div>
          <div class="img">
            <img 
              src={hotspot.thumbnail} 
              alt="Previous thumbnail"
              loading="lazy"
            />
          </div>
        </button>
      </div>
      <div class="third">
        <button class="progress-button" on:click={nextHotspot}>
          <div class="control">
            <img 
              src="/icons/arrow-right.svg" 
              alt="Next"
              width="16"
              height="16"
              loading="lazy"
            />
          </div>
          <div class="img">
            <img 
              src={hotspot.thumbnail} 
              alt="Next thumbnail"
              loading="lazy"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</div>