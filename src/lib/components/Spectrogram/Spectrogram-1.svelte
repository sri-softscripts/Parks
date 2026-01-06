<script>
  import { onMount } from 'svelte';
  
  let currentSound = '';
  let isLoading = false;
  
  const soundFiles = {
    'Forest': '/audio/test-forest.mp3',
    'Desert': '/audio/test-desert.mp3',
    'Lake': '/audio/Uau_HAL.mp3'
  };
  
  let iframeSrc = '';
  
  function playSound(soundName) {
    currentSound = soundName;
    isLoading = true;
    
    
    const soundPath = soundFiles[soundName];
    
    // Direct path to the ChromeAnalyzer index.html
    iframeSrc = `/ChromeAnalyzer/index.html?sound=${encodeURIComponent(soundPath)}`;
    
    // Give it a moment to load
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  }
</script>

<div class="page-inner">
  <div class="page-content">
     <div class="spectrogram-tips" id="spectrogram-section-1-tips">
                <div class="spectrogram-tips__item">
                    <a href="#" class="close-tip">Close</a>
                    <div class="spectrogram-tips__item-img">
                        <img loading="lazy" src="/images/seven.png" alt="flying-bird">
                    </div>    
                    <div class="spectrogram-tips__item-text">
                        Listen carefully to see if you can hear the eagle crying.                                
                    </div>
                </div>
                <div class="spectrogram-tips__item">
                    <a href="#" class="close-tip">Close</a>
                    <div class="spectrogram-tips__item-img">
                        <img loading="lazy" src="/images/lizard.png" alt="lizard">
                    </div>    
                    <div class="spectrogram-tips__item-text">
                        Did you hear the lizard? If you missed it, listen to the clip below and see if you can hear it again.<br><br><a href="#trigger-forest" class="listen-tip">Listen</a>
                    </div>
                </div>
            </div>  
            <div class="spectrogram-tips" id="spectrogram-section-3-tips">
                <div class="spectrogram-tips__item">
                    <a href="#" class="close-tip">Close</a>
                    <div class="spectrogram-tips__item-img">
                        <img loading="lazy" src="/images/coyote.png" alt="coyote">
                    </div>    
                    <div class="spectrogram-tips__item-text">
                        Can you still hear the coyote howling when one of the noises are clicked?
                    </div>
                </div>                        
            </div>
            <div class="section--1">
                <div class="container">
                    <header class="page-header">
                        <h1 class="page-title">Spectrogram</h1>
                        <div class="sub-title">
                           A spectrogram is a graphical representation of acoustic measurements. Acoustic spectrograms have three axes: <strong>time, frequency, and intensity</strong>.
                        </div>
                    </header>
                </div>
            </div>
    
    <div class="spectrogram-section" id="spectrogram-section-1">
      <div class="container">
        <div class="spectrogram-header">
          <h2 class="base color-green">Natural Ambient</h2>
          <div class="sub-title">Composed of the natural sound conditions in a park that exist in the absence of any human-made noise.</div>
        </div>  
        
        <div class="spectrogram-action">
          <div class="spectrogram-container">
            <h3>Choose an environment</h3>
            <div class="spectrogram-buttons">
              <div data-name="Forest" class="spectrogram-button" on:click={() => playSound('Forest')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-forest.svg" alt="Forest icon">
                </div>
                <div class="spectrogram-button-text">Forest</div>
              </div>
              <div data-name="Desert" class="spectrogram-button" on:click={() => playSound('Desert')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="icons/icon-desert.svg" alt="Desert icon">
                </div>
                <div class="spectrogram-button-text">Desert</div>
              </div>
              <div data-name="Lake" class="spectrogram-button" on:click={() => playSound('Lake')}>
                <div class="spectrogram-button-icon">
                  <img loading="lazy" src="/icons/icon-lake.svg" alt="Lake icon">
                </div>
                <div class="spectrogram-button-text">Lake</div>
              </div>                                                                
            </div>
          </div>
        </div>                                                               
        
        <div class="spectrogram-set" style="height: 600px;">
          {#if iframeSrc}
            <iframe 
              src={iframeSrc}
              style="width: 120%; height: 100%; border: none;"
              title="3D Sonogram Visualizer"
            ></iframe>
          {:else}
            <!-- Default/placeholder state -->
            <div style="width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; color: white;">
              Select an environment to view the Spectrogram
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
        
        <!-- Your existing pagination -->
        <div class="pagnation-blk">
          <button type="button" name="button" data-parent="spectrogram" data-target="spectrogram-noise" class="button move-to-next-names">
            <i class="fa fa-angle-down" aria-hidden="true"></i> <span>Next: Noise</span>
          </button>
        </div> 
      </div>
    </div>                                              
  </div>
</div>
