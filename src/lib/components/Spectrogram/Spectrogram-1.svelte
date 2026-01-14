<script>
  import { onDestroy } from 'svelte';
  import { activeSpectrogram } from './spectrogramStore';
  import Footer from '$lib/components/Footer.svelte';
  let currentSound = '';
  let isLoading = false;
  let iframeSrc = '';
  let iframeElement;
  let unsubscribe;
  let showTips = false;
  let currentTips = [];
  let isPlaying = true; // Start as true since audio autoplays
  
  const soundFiles = {
    'Forest': '/audio/crickets.mp3',
    'Desert': '/audio/Coyote.mp3',
    'Lake': '/audio/Alligator.mp3'
  };
  
  // Define tips for each sound
  const soundTips = {
    'Forest': [
      {
        id: 1,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Did you hear the lizard? If you missed it, listen to the clip below and see if you can hear it again.',
        hasListenButton: true
      }
    ],
    'Desert': [
      {
        id: 2,
        image: '/images/coyote.png',
        alt: 'coyote',
        text: 'Can you still hear the coyote howling when one of the noises are clicked?',
        hasListenButton: false
      }
    ],
    'Lake': [
      {
        id: 3,
        image: '/images/seven.png',
        alt: 'flying-bird',
        text: 'Listen carefully to see if you can hear the eagle crying.',
        hasListenButton: false
      }
    ]
  };
  
  // Subscribe to the store
  unsubscribe = activeSpectrogram.subscribe(value => {
    // Only show iframe if this section is active
    if (value.section === 1) {
      iframeSrc = value.iframeSrc;
      // Show tips for the current sound
      if (value.sound && soundTips[value.sound]) {
        currentTips = soundTips[value.sound];
        showTips = true;
        isPlaying = true; // Reset to playing when new sound loads
      }
    } else {
      iframeSrc = '';
      showTips = false;
      currentTips = [];
      // Clear iframe when not active
      if (iframeElement) {
        iframeElement.src = 'about:blank';
      }
    }
  });
  
  function playSound(soundName) {
    currentSound = soundName;
    isLoading = true;
    showTips = false; // Hide tips while loading
    isPlaying = true; // Set to playing when loading new sound
    
    const soundPath = soundFiles[soundName];
    const newSrc = `/ChromeAnalyzer/index.html?sound=${encodeURIComponent(soundPath)}`;
    
    // Update the shared store - this will clear other sections
    activeSpectrogram.set({
      section: 1,
      sound: soundName,
      iframeSrc: newSrc
    });
    
    // Give it a moment to load
    setTimeout(() => {
      isLoading = false;
      // Show tips after loading
      currentTips = soundTips[soundName] || [];
      showTips = true;
    }, 1000);
  }
  
  function togglePlayPause() {
    if (!iframeElement || !iframeElement.contentWindow) return;
    
    // Toggle the playing state first
    isPlaying = !isPlaying;
    
    try {
      // Access the iframe's audio element and toggle play/pause
      const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
      
      // Method 1: Try to get audio element directly
      const audioElements = iframeDoc.getElementsByTagName('audio');
      if (audioElements.length > 0) {
        const audio = audioElements[0];
        if (isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
        return;
      }
      
      // Method 2: Try to execute play/pause in iframe context
      iframeElement.contentWindow.postMessage({
        action: isPlaying ? 'play' : 'pause',
        type: 'audioControl'
      }, '*');
      
      // Method 3: Try to trigger play/pause via the spec3D object
      if (iframeElement.contentWindow.spec3D && iframeElement.contentWindow.spec3D.audioContext) {
        if (isPlaying) {
          iframeElement.contentWindow.spec3D.audioContext.resume();
        } else {
          iframeElement.contentWindow.spec3D.audioContext.suspend();
        }
      }
      
    } catch (error) {
      console.error('Error controlling iframe audio:', error);
      // If we can't control the iframe audio, revert the state
      isPlaying = !isPlaying;
    }
  }
  
  function closeTips() {
    showTips = false;
  }
  
  function listenToSound() {
    // This function triggers the forest sound specifically
    if (currentSound === 'Forest') {
      playSound('Forest');
    }
  }
  
  // Listen for messages from iframe about playback state
  function handleMessage(event) {
    // Check if message is from our ChromeAnalyzer
    if (event.data && event.data.type === 'playbackState') {
      isPlaying = event.data.isPlaying;
    }
    
    // Handle audio control responses
    if (event.data && event.data.type === 'audioControlResponse') {
      isPlaying = event.data.isPlaying;
    }
  }
  
  // Add message listener when component mounts
  if (typeof window !== 'undefined') {
    window.addEventListener('message', handleMessage);
  }
  
  // Function to check iframe audio state periodically
  function checkIframeAudioState() {
    if (!iframeElement || !iframeElement.contentWindow || !showTips) return;
    
    try {
      const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
      const audioElements = iframeDoc.getElementsByTagName('audio');
      
      if (audioElements.length > 0) {
        const audio = audioElements[0];
        // Update our state to match iframe audio state
        if (isPlaying !== !audio.paused) {
          isPlaying = !audio.paused;
        }
      }
    } catch (error) {
      // Cross-origin errors expected, ignore
    }
  }
  
  // Set up interval to check audio state
  let audioCheckInterval;
  
  // Watch for iframe loading
  $: if (iframeElement && showTips) {
    clearInterval(audioCheckInterval);
    audioCheckInterval = setInterval(checkIframeAudioState, 500);
  }
  
  // Clean up when component is destroyed
  onDestroy(() => {
    // Unsubscribe from store
    if (unsubscribe) unsubscribe();
    
    // Remove message listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleMessage);
    }
    
    // Clear interval
    clearInterval(audioCheckInterval);
    
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
    <!-- Dynamic tips section - inline style overrides CSS display: none -->
    <div class="spectrogram-tips" id="spectrogram-section-1-tips" style="display: {showTips ? 'block' : 'none'};">
      {#if showTips && currentTips.length > 0}
        {#each currentTips as tip}
          <div class="spectrogram-tips__item">
            <a href="#" class="close-tip" on:click|preventDefault={closeTips}>Close</a>
            <div class="spectrogram-tips__item-img">
              <img loading="lazy" src={tip.image} alt={tip.alt}>
            </div>    
            <div class="spectrogram-tips__item-text">
              {tip.text}
              <br><br>
              <div class="tip-controls">
                <button 
                  class="play-pause-tip" 
                  on:click|preventDefault={togglePlayPause}
                  style="background-color: {isPlaying ? '#FF0000' : '#FF931E'};"
                >
                  {#if isPlaying}
                    <span class="pause" style="display: flex; align-items: center; gap: 6px;">
                      <i class="icon-pause-circled" style="font-size: 14px;"></i>
                      Pause
                    </span>
                  {:else}
                    <span class="play" style="display: flex; align-items: center; gap: 6px;">
                      <i class="icon-volume-up" style="font-size: 14px;"></i>
                      Listen
                    </span>
                  {/if}
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
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
                  <img loading="lazy" src="/icons/icon-desert.svg" alt="Desert icon">
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
              bind:this={iframeElement}
              src={iframeSrc}
              style="width: 120%; height: 100%; border: none;"
              title="3D Sonogram Visualizer"
            ></iframe>
          {:else}
            <div style="width: 80%; height: 80%; background: #141414; display: flex; justify-content: center; margin:0 auto;">
              <!-- <img src="/images/spectrum1.png"> -->
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
          <button type="button" name="button" data-parent="spectrogram" data-target="spectrogram-noise" class="button move-to-next-names">
            <i class="fa fa-angle-down" aria-hidden="true"></i> <span>Next: Noise</span>
          </button>
        </div> 
      </div>
    </div>                                              
  </div>
</div>
<div style="background-color: #ffffff; color:#000000;">
<Footer nextPage="/functional-effects" hikerColor="#000000" textColor="#000000" />
</div>
<style>
  .play-pause-tip {
    display: inline-flex;
    align-items: center;
    border: none;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0;
    margin: 0;
    line-height: 12px;
    padding: 5px 15px;
    border-radius: 15px;
    transition: background-color 0.3s ease;
  }
  
  .play-pause-tip:hover {
    opacity: 0.9;
  }
  
  .play-pause-tip i {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tip-controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  /* Ensure icons are properly aligned */
  .icon-pause-circled:before,
  .icon-volume-up:before {
    vertical-align: middle;
  }
</style>
