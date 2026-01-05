
<script lang="ts">
  import type { Hotspot } from './types';
  
  export let hotspot: Hotspot;
  export let currentStepValue: number;
  export let activeCalloutId: string;
  
  $: isHighlighted = currentStepValue === hotspot.highlightAt;
  $: isVisible = currentStepValue >= hotspot.showAt;
  $: showCallout = activeCalloutId === hotspot.id;
</script>

<div
  id={hotspot.id}
  class="hotspot"
  style="opacity: {isVisible ? 1 : 0.3}; transition: opacity 0.3s ease;"
>
  <div class="hotspot__indicator">
    <div 
      class="hotspot__ring"
      class:hotspot__ring--gold={isHighlighted}
      class:hotspot__ring--white={!isHighlighted}
    ></div>
    <div class="hotspot__indicator-image">
      <img
        loading="lazy"
        src={hotspot.image}
        alt={hotspot.name}
      />
      <span class="scope-v"></span>
      <span class="scope-h"></span>
    </div>
  </div>
  
  <!-- Callout -->
  {#if showCallout}
    <div class="hotspot__callout" style="opacity: 1; transition: opacity 0.3s ease;">
      <div class="hotspot__name">{hotspot.name}</div>
      <div class="hotspot__content">
        <div class="hotspot__description">
          {hotspot.description}
        </div>
      </div>
      <div class="hotspot__image">
        <img
          loading="lazy"
          src={hotspot.image}
          alt={hotspot.name}
        />
      </div>
    </div>
  {/if}
</div>
