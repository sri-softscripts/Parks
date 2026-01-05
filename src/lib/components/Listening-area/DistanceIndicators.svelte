<script lang="ts">
  export let currentStepValue: number;
  
  const distanceLabels = ['100 ft', '', '60 ft', '', '20 ft', '', '20 ft', '', '60 ft', '', '100 ft'];
</script>

<div class="distance">
  {#each distanceLabels as indicator, i}
    <div 
      class="distance__indicator"
      class:dimmed={currentStepValue >= 75 && i >= 5}
    >
      {indicator}
    </div>
  {/each}
</div>
