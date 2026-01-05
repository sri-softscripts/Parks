<script lang="ts">
  import { activeSection } from "$lib/stores/activeSection";
  import { sections } from "$lib/config/sections";

  $: current = $activeSection;
  const index = sections.findIndex(s => s.slug === current);

  const goNext = () => {
    const next = sections[index + 1];
    if (next) activeSection.set(next.slug);
  };
</script>

{#if sections.findIndex(s => s.slug === $activeSection) < sections.length - 1}
<button class="button button-down" on:click={goNext}>
  <img src="/src/lib/assets/icons/arrow-down.svg" width="22" height="11" />
</button>
{/if}
