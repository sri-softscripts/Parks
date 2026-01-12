<script>
  import { onDestroy } from 'svelte';
  import { activeSpectrogram } from './spectrogramStore';
    import Footer from '$lib/components/Footer.svelte';
  
  let currentEnvironment = '';
  let currentNoise = '';
  let isLoading = false;
  let iframeSrc = '';
  let iframeElement;
  let unsubscribe;
  
  // Mapping for environment names to sound file prefixes
  const environmentPrefix = {
    'Forest': 'Crickets',
    'Desert': 'Coyote',
    'Lake': 'Alligator'
  };
  
  // Mapping for noise names to sound file suffixes
  const noiseSuffix = {
    'Boat': 'Boat',
    'Car': 'Cars',
    'Airplane': 'Plane',
    'Thunder': 'Thunder',
    'Visitors': 'Visitors'
  };
  
  // Subscribe to the store
  unsubscribe = activeSpectrogram.subscribe(value => {
    // Only show iframe if this section is active
    if (value.section === 3) {
      iframeSrc = value.iframeSrc;
    } else {
      iframeSrc = '';
      currentEnvironment = '';
      currentNoise = '';
      // Clear iframe when not active
      if (iframeElement) {
        iframeElement.src = 'about:blank';
      }
    }
  });
  
  function selectEnvironment(envName) {
    currentEnvironment = envName;
    if (currentNoise) {
      playMasking();
    }
  }
  
  function selectNoise(noiseName) {
    currentNoise = noiseName;
    if (currentEnvironment) {
      playMasking();
    }
  }
  
  function playMasking() {
    isLoading = true;
    
    // Build the filename: Crickets_Boat.mp3, Coyote_Cars.mp3, Alligator_Plane.mp3, etc.
    const envPrefix = environmentPrefix[currentEnvironment];
    const noiseSfx = noiseSuffix[currentNoise];
    const soundPath = `/audio/${envPrefix}_${noiseSfx}.mp3`;
    
    const newSrc = `/ChromeAnalyzer/index.html?sound=${encodeURIComponent(soundPath)}`;
    
    // Update the shared store - this will clear other sections
    activeSpectrogram.set({
      section: 3,
      sound: `${currentEnvironment} + ${currentNoise}`,
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
    <div class="spectrogram-section" id="spectrogram-section-3">
      <div class="container">
        <div class="spectrogram-header">
          <h2 class="base color-cream">Masking</h2>
          <div class="sub-title">
            The process by which the ability to hear a sound is reduced
            by the presence of another sound. Just as smog limits the
            ability to see a landscape, noise masks our ability to hear
            sound.
          </div>
        </div>
        
        <div class="spectrogram-action">
          <div class="spectrogram-container">
            <h3>Choose an environment</h3>
            <div class="spectrogram-buttons">
              <div
                data-name="Forest"
                class="spectrogram-button"
                class:active={currentEnvironment === 'Forest'}
                on:click={() => selectEnvironment('Forest')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-forest.svg" alt="Forest icon">
                </div>
                <div class="spectrogram-button-text">Forest</div>
              </div>
              
              <div
                data-name="Desert"
                class="spectrogram-button"
                class:active={currentEnvironment === 'Desert'}
                on:click={() => selectEnvironment('Desert')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-desert.svg" alt="Desert icon">
                </div>
                <div class="spectrogram-button-text">Desert</div>
              </div>
              
              <div
                data-name="Lake"
                class="spectrogram-button"
                class:active={currentEnvironment === 'Lake'}
                on:click={() => selectEnvironment('Lake')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-lake.svg" alt="Lake icon">
                </div>
                <div class="spectrogram-button-text">Lake</div>
              </div>
            </div>
          </div>
          
          <div class="spectrogram-container">
            <h3>Then choose a noise to experience masking</h3>
            <div class="spectrogram-buttons">
              <div
                data-name="Boat"
                class="spectrogram-button"
                class:active={currentNoise === 'Boat'}
                on:click={() => selectNoise('Boat')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-boat.svg" alt="Boat icon">
                </div>
                <div class="spectrogram-button-text">Boat</div>
              </div>
              
              <div
                data-name="Car"
                class="spectrogram-button"
                class:active={currentNoise === 'Car'}
                on:click={() => selectNoise('Car')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-car.svg" alt="Car icon">
                </div>
                <div class="spectrogram-button-text">Car</div>
              </div>
              
              <div
                data-name="Airplane"
                class="spectrogram-button"
                class:active={currentNoise === 'Airplane'}
                on:click={() => selectNoise('Airplane')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-plane.svg" alt="Airplane icon">
                </div>
                <div class="spectrogram-button-text">Airplane</div>
              </div>
              
              <div
                data-name="Thunder"
                class="spectrogram-button"
                class:active={currentNoise === 'Thunder'}
                on:click={() => selectNoise('Thunder')}
              >
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-thunder.svg" alt="Thunder icon">
                </div>
                <div class="spectrogram-button-text">Thunder</div>
              </div>
              
              <div
                data-name="Visitors"
                class="spectrogram-button"
                class:active={currentNoise === 'Visitors'}
                on:click={() => selectNoise('Visitors')}
              >
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
              {#if !currentEnvironment}
               <!-- <img src="/images/spectrum3.png"> -->
              {:else if !currentNoise}
                <!-- <img src="/images/spectrum3.png"> -->
              {:else}
                Loading...
              {/if}
            </div>
          {/if}
          
          {#if isLoading}
            <div class="music-box__modal">
              <div class="music-box__modal__message">
                <div class="music-box__modal__message__text">Loading masking effect...</div>
                <svg class="spinner" width="55px" height="55px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle class="circle" fill="none" stroke-width="3" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
              </div>
            </div>
          {/if}
        </div>
        
        <div class="pagnation-blk">
          <button
            class="button button-up move-to-next-names"
            type="button"
            name="button"
            data-parent="spectrogram-masking"
            data-target="spectrogram-noise"
          >
            <i class="fa fa-angle-up" aria-hidden="true"></i>
            <span>Previous: Noise</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer nextPage="/functional-effects" />