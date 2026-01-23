<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SpectrogramOne from '$lib/components/Spectrogram/Spectrogram-1.svelte';
  import Spectrogramtwo from '$lib/components/Spectrogram/Spectrogram-2.svelte';
  import Spectrogramthree from '$lib/components/Spectrogram/Spectrogram-3.svelte';
  import { activeSpectrogram } from '$lib/components/Spectrogram/spectrogramStore';
    import '../../spectrogram.css'

  let currentSection = 1;

  function goToSection(sectionNumber: number) {
    // Reset store to stop any running audio/visualizations
    activeSpectrogram.set({
      section: 0,
      sound: '',
      iframeSrc: ''
    });
    
    currentSection = sectionNumber;
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    // Setup click handlers for navigation buttons
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.move-to-next-names, .move-to-next');
      
      if (button) {
        const dataTarget = button.getAttribute('data-target');
        
        // Map data-target to section numbers
        if (dataTarget === 'spectrogram-noise') {
          goToSection(2);
        } else if (dataTarget === 'spectrogram') {
          goToSection(1);
        } else if (dataTarget === 'spectrogram-masking') {
          goToSection(3);
        }
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleButtonClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleButtonClick);
      // Reset store when leaving the page entirely
      activeSpectrogram.set({
        section: 0,
        sound: '',
        iframeSrc: ''
      });
    };
  });
</script>

<div class="spectrogram-container">
  {#if currentSection === 1}
    <section
      id="spectrogram"
      class="spectrogram-page"
      in:fly="{{ y: 100, duration: 600, delay: 300 }}"
      out:fly="{{ y: -100, duration: 300 }}"
    >
      <SpectrogramOne />
    </section>
  {/if}

  {#if currentSection === 2}
    <section
      id="spectrogram-noise"
      class="spectrogram-page"
      in:fly="{{ y: 100, duration: 600, delay: 300 }}"
      out:fly="{{ y: -100, duration: 300 }}"
    >
      <Spectrogramtwo />
    </section>
  {/if}

  {#if currentSection === 3}
    <section
      id="spectrogram-masking"
      class="spectrogram-page"
      in:fly="{{ y: 100, duration: 600, delay: 300 }}"
      out:fly="{{ y: -100, duration: 300 }}"
    >
      <Spectrogramthree />
    </section>
  {/if}
</div>

<style>
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'); */
  .spectrogram-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  .spectrogram-page {
    position: relative;
    width: 100%;
  }
</style>