<script lang="ts">
  import { HOTSPOTS } from './constants';
  import { getCurrentMaskVisibility, getCurrentPlaneVisibility, getActiveCalloutId, getAudioToPlay } from './utils';
  import HotspotItem from './HotspotItem.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let currentStepValue: number;
  
  $: currentMaskVisibility = getCurrentMaskVisibility(currentStepValue);
  $: currentPlaneVisibility = getCurrentPlaneVisibility(currentStepValue);
  $: activeCalloutId = getActiveCalloutId(currentMaskVisibility);
  $: audioToPlay = getAudioToPlay(currentMaskVisibility);
  
  // Audio handling
  let audioElement: HTMLAudioElement | null = null;
  let previousAudio = '';
  
  // Function to play audio
  function playAudio(audioName: string) {
    if (!browser || !audioName) return;
    
    // Stop previous audio
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    
    // Create and play new audio
    const audioPath = `/src/lib/assets/audio/${audioName}.mp3`;
    audioElement = new Audio(audioPath);
    audioElement.volume = 0.7; // Adjust volume as needed
    audioElement.play().catch(error => {
      console.warn(`Audio playback failed for ${audioName}:`, error);
    });
    
    previousAudio = audioName;
  }
  
  // Watch for audio changes
  $: {
    if (browser && audioToPlay && audioToPlay !== previousAudio) {
      playAudio(audioToPlay);
    }
  }
  
  onMount(() => {
    // Initial audio play if mask1 is visible
    if (browser && audioToPlay) {
      playAudio(audioToPlay);
    }
  });
  
  onDestroy(() => {
    // Clean up audio when component is destroyed
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  });
</script>

<div class="animation-container">
  <!-- Background Masks -->
  <div class="bg-masks">
    {#each [1, 2, 3, 4] as maskIndex}
      <div 
        class="mask mask-{maskIndex}"
        style="display: {currentMaskVisibility[`mask${maskIndex}`] ? 'block' : 'none'}; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      >
        <img 
          loading="lazy" 
          src="/src/lib/assets/images/la-mask-{maskIndex}.png" 
          alt="Background mask {maskIndex}"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </div>
    {/each}
  </div>

  <!-- Planes -->
  <div class="planes">
    {#each [1, 2, 3] as planeIndex}
      <div 
        class="plane plane--{planeIndex}"
        style="display: {currentPlaneVisibility[`plane${planeIndex}`] ? 'block' : 'none'}; animation: fadeIn 0.5s ease;"
      >
        <img 
          loading="lazy" 
          src="/src/lib/assets/images/la-plane-{planeIndex}.png" 
          alt="Airplane {planeIndex}"
        />
      </div>
    {/each}
  </div>

  <!-- Animal Hotspots -->
  <div class="animal-hotspots">
    {#each HOTSPOTS as hotspot (hotspot.id)}
      <HotspotItem
        {hotspot}
        currentStepValue={currentStepValue}
        {activeCalloutId}
      />
    {/each}
  </div>
</div>
