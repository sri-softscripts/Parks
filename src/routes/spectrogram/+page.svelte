<script lang="ts">
  import SpectrogramOne from '$lib/components/Spectrogram/Spectrogram-1.svelte';
  import Spectrogramtwo from '$lib/components/Spectrogram/Spectrogram-2.svelte';
  import Spectrogramthree from '$lib/components/Spectrogram/Spectrogram-3.svelte';
</script>

   <section
        id="spectrogram"
        class="spectrogram-page"
      >
       <SpectrogramOne />
      </section>

       <section
        id="spectrogram-noise"
        class="spectrogram-page"
      >
       <Spectrogramtwo />
      </section>

      <section
        id="spectrogram-masking"
        class="spectrogram-page"
      >
       <Spectrogramthree />
      </section>
