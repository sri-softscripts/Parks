<script lang="ts">
  import { onMount, tick, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { STEPS, STEP_LABELS } from './constants';
  import { snapToStep, findStepIndex, getSliderStyles } from './utils';
  
  export let currentStep: number;
  export let scrubValue: number;
  
  let isDragging = false;
  let sliderElement: HTMLElement | null = null;
  
  const dispatch = createEventDispatcher<{
    change: { step: number; value: number };
  }>();
  
  $: currentStepValue = STEPS[currentStep];
  $: sliderStyles = getSliderStyles(scrubValue);
  $: ariaValueText = STEP_LABELS[currentStep] || `Step ${currentStep + 1}`;
  
  function updateStates(snappedValue: number, stepIndex: number) {
    console.log('Updating states:', { snappedValue, stepIndex });
    dispatch('change', { step: stepIndex, value: snappedValue });
    tick();
  }
  
  function handleSliderInteraction(clientX: number) {
    if (!browser || !sliderElement) return;
    
    const rect = sliderElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    
    const snappedValue = snapToStep(percent);
    const stepIndex = findStepIndex(snappedValue);
    
    updateStates(snappedValue, stepIndex);
  }
  
  function handleMouseDown(event: MouseEvent) {
    if (!browser) return;
    
    isDragging = true;
    handleSliderInteraction(event.clientX);
    
    function handleMouseMove(event: MouseEvent) {
      if (isDragging) {
        handleSliderInteraction(event.clientX);
      }
    }
    
    function handleMouseUp() {
      isDragging = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  
  function handleTouchStart(event: TouchEvent) {
    if (!browser) return;
    
    isDragging = true;
    event.preventDefault();
    
    if (event.touches[0]) {
      handleSliderInteraction(event.touches[0].clientX);
    }
    
    function handleTouchMove(event: TouchEvent) {
      event.preventDefault();
      if (isDragging && event.touches[0]) {
        handleSliderInteraction(event.touches[0].clientX);
      }
    }
    
    function handleTouchEnd() {
      isDragging = false;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
    
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  }
  
  function handleKeyDown(event: KeyboardEvent) {
    if (!browser) return;
    
    let newStep = currentStep;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newStep = Math.max(0, currentStep - 1);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newStep = Math.min(STEPS.length - 1, currentStep + 1);
        break;
      case 'Home':
        event.preventDefault();
        newStep = 0;
        break;
      case 'End':
        event.preventDefault();
        newStep = STEPS.length - 1;
        break;
      default:
        return;
    }
    
    if (newStep !== currentStep) {
      updateStates(STEPS[newStep], newStep);
    }
  }
  
  function handlePipClick(index: number) {
    if (index >= 0 && index < STEPS.length) {
      updateStates(STEPS[index], index);
    }
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Find the correct step for initial 8% value
    const snappedValue = snapToStep(scrubValue);
    const stepIndex = findStepIndex(snappedValue);
    
    // Dispatch to sync with parent if needed
    if (stepIndex !== currentStep) {
      updateStates(snappedValue, stepIndex);
    }
  });
</script>

<div class="scrubber">
  <div class="scrubber__directions">
    Move the slider to start the experience
  </div>
  
  <!-- Custom slider -->
  <div
    class="rangeslider rangeslider--horizontal"
    bind:this={sliderElement}
    on:mousedown={handleMouseDown}
    on:touchstart={handleTouchStart}
    on:keydown={handleKeyDown}
    tabindex="0"
    role="slider"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow={scrubValue}
    aria-valuetext={ariaValueText}
    aria-label="Adjust airplane noise level to see its effect on animal hearing"
  >
    <div class="rangeslider__fill" style={sliderStyles.fill}></div>
    <div class="rangeslider__handle" style={sliderStyles.handle}></div>
  </div>
  
  <!-- Pips -->
  <div class="pips">
    {#each STEPS as step, index}
      <button
        type="button"
        class="pip"
        class:pip--active={index === currentStep}
        on:click={() => handlePipClick(index)}
        aria-label={STEP_LABELS[index]}
        aria-current={index === currentStep ? 'true' : 'false'}
      >
        <span class="pip__label"></span>
      </button>
    {/each}
  </div>
</div>


