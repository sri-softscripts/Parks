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
  let showTips = false;
  let currentTips = [];
  let isPlaying = true;
  
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
  
  // Define tips for each environment+noise combination
  const maskingTips = {
    'Forest_Boat': [
      {
        id: 1,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Can you hear the lizard over the boat engine noise? The boat sound masks the natural forest sounds.',
        hasListenButton: false
      }
    ],
    'Forest_Car': [
      {
        id: 2,
        image: '/images/seven.png',
        alt: 'flying-bird',
        text: 'Try to identify bird sounds through the car noise. Traffic noise often masks subtle forest sounds.',
        hasListenButton: false
      }
    ],
    'Forest_Airplane': [
      {
        id: 3,
        image: '/images/coyote.png',
        alt: 'coyote',
        text: 'Airplane noise can travel far. Can you still hear the forest ambiance clearly?',
        hasListenButton: false
      }
    ],
    'Forest_Thunder': [
      {
        id: 4,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Thunder masks high-frequency sounds. Listen for how it affects insect and small animal noises.',
        hasListenButton: false
      }
    ],
    'Forest_Visitors': [
      {
        id: 5,
        image: '/images/seven.png',
        alt: 'flying-bird',
        text: 'Human voices mask natural sounds. Can you distinguish between visitor noise and forest wildlife?',
        hasListenButton: false
      }
    ],
    'Desert_Boat': [
      {
        id: 6,
        image: '/images/coyote.png',
        alt: 'coyote',
        text: 'Boat noise is unusual in desert settings. Notice how it masks the subtle desert ambiance.',
        hasListenButton: false
      }
    ],
    'Desert_Car': [
      {
        id: 7,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Desert animals rely on hearing. Car noise masks predator and prey sounds in the ecosystem.',
        hasListenButton: false
      }
    ],
    'Desert_Airplane': [
      {
        id: 8,
        image: '/images/coyote.png',
        alt: 'coyote',
        text: 'In open desert, airplane noise travels far. Can you still hear coyote calls clearly?',
        hasListenButton: false
      }
    ],
    'Desert_Thunder': [
      {
        id: 9,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Desert thunder masks subtle sounds. Listen for how it affects insect and small animal detection.',
        hasListenButton: false
      }
    ],
    'Desert_Visitors': [
      {
        id: 10,
        image: '/images/coyote.png',
        alt: 'coyote',
        text: 'Visitor noise in desert settings can mask wildlife communication. Can you hear through it?',
        hasListenButton: false
      }
    ],
    'Lake_Boat': [
      {
        id: 11,
        image: '/images/seven.png',
        alt: 'flying-bird',
        text: 'Boat motors mask water bird calls. Notice how the engine noise affects lake ambiance.',
        hasListenButton: false
      }
    ],
    'Lake_Car': [
      {
        id: 12,
        image: '/images/seven.png',
        alt: 'flying-bird',
        text: 'Road noise near lakes masks bird and amphibian sounds. Can you identify specific species?',
        hasListenButton: false
      }
    ],
    'Lake_Airplane': [
      {
        id: 13,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Airplane noise reflects off water. Listen for how it masks the subtle lake ecosystem sounds.',
        hasListenButton: false
      }
    ],
    'Lake_Thunder': [
      {
        id: 14,
        image: '/images/seven.png',
        alt: 'flying-bird',
        text: 'Thunder over water masks high-frequency bird calls. Notice the masking effect on water birds.',
        hasListenButton: false
      }
    ],
    'Lake_Visitors': [
      {
        id: 15,
        image: '/images/lizard.png',
        alt: 'lizard',
        text: 'Lake visitors mask aquatic life sounds. Can you hear the natural lake sounds clearly?',
        hasListenButton: false
      }
    ]
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
      showTips = false;
      currentTips = [];
      // Clear iframe when not active
      if (iframeElement) {
        iframeElement.src = 'about:blank';
      }
    }
  });
  
  function selectEnvironment(envName) {
    currentEnvironment = envName;
    showTips = false; // Hide tips while loading
    if (currentNoise) {
      playMasking();
    }
  }
  
  function selectNoise(noiseName) {
    currentNoise = noiseName;
    showTips = false; // Hide tips while loading
    if (currentEnvironment) {
      playMasking();
    }
  }
  
  function playMasking() {
    isLoading = true;
    showTips = false;
    
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
      isPlaying = true;
      // Show tips for this specific combination after loading
      const combinationKey = `${currentEnvironment}_${currentNoise}`;
      if (maskingTips[combinationKey]) {
        currentTips = maskingTips[combinationKey];
        showTips = true;
      }
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
    <!-- Dynamic tips section for masking - inline style overrides CSS display: none -->
    <div class="spectrogram-tips" id="spectrogram-section-3-tips" style="display: {showTips ? 'block' : 'none'};">
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
