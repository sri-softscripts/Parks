<script>
  export let src;
  export let title;
  export let warning = false;
  let audioEl;
  let isPlaying = false;

  function toggle() {
    isPlaying ? audioEl.pause() : audioEl.play();
    isPlaying = !isPlaying;
  }

  function onEnded() {
    isPlaying = false;
  }
</script>

<div class="sound-effect {warning ? 'sound-effect--warning' : ''}">
  <div class="sound-effect__icon">
    <img src={`/assets/images/icon-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}.svg`} alt="" loading="lazy" />
  </div>
  <button class="sound-effect__button" on:click={toggle} aria-label="{isPlaying ? 'Pause' : 'Play'} {title}">
    {#if isPlaying}
      <span class="pause"><i class="icon-pause-circled"></i>Pause</span>
    {:else}
      <span class="play"><i class="icon-volume-up"></i>Listen</span>
    {/if}
  </button>
  <audio {src} bind:this={audioEl} on:ended={onEnded} preload="metadata"></audio>
  <div class="sound-effect__title">
    <strong>{title}</strong>
    {#if warning}
      <div class="sound-effect__warning"><i class="icon-attention"></i></div>
    {/if}
  </div>
</div>

<style>
  .sound-effect { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid #C5C5C5; border-radius: 4px; }
  .sound-effect__button { background: none; border: none; cursor: pointer; font-size: 14px; color: #575757; }
  .sound-effect--warning { border-color: #DB592C; }
  .sound-effect__warning { color: #DB592C; font-size: 18px; }
</style>