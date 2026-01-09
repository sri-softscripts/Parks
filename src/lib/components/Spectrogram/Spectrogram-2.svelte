<script>
  import { onDestroy } from 'svelte';
  import { activeSpectrogram } from './spectrogramStore';
  
  let currentSound = '';
  let isLoading = false;
  let iframeSrc = '';
  let iframeElement;
  let unsubscribe;
  
  const soundFiles = {
    'Boat': '/audio/Boat.mp3',
    'Car': '/audio/Car.mp3',
    'Airplane': '/audio/Plane.mp3',
    'Thunder': '/audio/Thunder.mp3',
    'Visitors': '/audio/Visitors.mp3'
  };
  
  // Subscribe to the store
  unsubscribe = activeSpectrogram.subscribe(value => {
    // Only show iframe if this section is active
    if (value.section === 2) {
      iframeSrc = value.iframeSrc;
    } else {
      iframeSrc = '';
      // Clear iframe when not active
      if (iframeElement) {
        iframeElement.src = 'about:blank';
      }
    }
  });
  
  function playSound(soundName) {
    currentSound = soundName;
    isLoading = true;
    
    const soundPath = soundFiles[soundName];
    const newSrc = `/ChromeAnalyzer/index.html?sound=${encodeURIComponent(soundPath)}`;
    
    // Update the shared store - this will clear other sections
    activeSpectrogram.set({
      section: 2,
      sound: soundName,
      iframeSrc: newSrc
    });
    
    // Give it a moment to load
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  }
  
  // Clean up when component is destroyed
  onDestroy(() => {
    // Unsubscribe from store
    if (unsubscribe) unsubscribe();
    
    // Clear iframe
    if (iframeElement) {
      iframeElement.src = 'about:blank';
      iframeElement = null;
    }
    
    // Reset store if this component was active
    activeSpectrogram.set({
      section: 0,
      sound: '',
      iframeSrc: ''
    });
  });
</script>

<div class="page-inner">
  <div class="page-content">
    <div class="spectrogram-section" id="spectrogram-section-2">
      <div class="container">
        <div class="spectrogram-header">
          <h2 class="base color-cream">Noise</h2>
          <div class="sub-title">
            Noise is defined as any non-natural, human-made sound.
          </div>
        </div>
        
        <div class="spectrogram-action">
          <div class="spectrogram-container">
            <h3>Choose a human-made noise</h3>
            <div class="spectrogram-buttons">
              <div data-name="Boat" class="spectrogram-button" on:click={() => playSound('Boat')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-boat.svg" alt="Boat icon">
                </div>
                <div class="spectrogram-button-text">Boat</div>
              </div>
              
              <div data-name="Car" class="spectrogram-button" on:click={() => playSound('Car')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-car.svg" alt="Car icon">
                </div>
                <div class="spectrogram-button-text">Car</div>
              </div>
              
              <div data-name="Airplane" class="spectrogram-button" on:click={() => playSound('Airplane')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-plane.svg" alt="Airplane icon">
                </div>
                <div class="spectrogram-button-text">Airplane</div>
              </div>
              
              <div data-name="Thunder" class="spectrogram-button" on:click={() => playSound('Thunder')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-thunder.svg" alt="Thunder icon">
                </div>
                <div class="spectrogram-button-text">Thunder</div>
              </div>
              
              <div data-name="Visitors" class="spectrogram-button" on:click={() => playSound('Visitors')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-visitors.svg" alt="Visitors icon">
                </div>
                <div class="spectrogram-button-text">Visitors</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="spectrogram-set" style="height: 600px;">
          {#if iframeSrc}
            <iframe 
              bind:this={iframeElement}
              src={iframeSrc}
              style="width: 120%; height: 100%; border: none;"
              title="3D Sonogram Visualizer"
            ></iframe>
          {:else}
            <div style="width: 70%; height: 70%; background: #141414; display: flex; align-items: center; justify-content: center;margin-left:20%;">
              <img src="/images/Spectrum2.png">
            </div>
          {/if}
          
          {#if isLoading}
            <div class="music-box__modal">
              <div class="music-box__modal__message">
                <div class="music-box__modal__message__text">Loading {currentSound}...</div>
                <svg class="spinner" width="55px" height="55px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle class="circle" fill="none" stroke-width="3" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
              </div>
            </div>
          {/if}
        </div>
        
        <div class="pagnation-blk">
          <button
            type="button"
            name="button"
            data-parent="spectrogram"
            data-target="spectrogram"
            class="button move-to-next-names"
          >
            <i class="fa fa-angle-up" aria-hidden="true"></i>
            <span>Previous: Natural Ambient</span>
          </button>
          <button
            class="button button-up move-to-next-names"
            type="button"
            name="button"
            data-parent="spectrogram-noise"
            data-target="spectrogram-masking"
          >
            <i class="fa fa-angle-down" aria-hidden="true"></i>
            <span>Next: Masking</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>