<script lang="ts">
  import { onMount } from 'svelte';
  import { STEPS } from './constants';
  import AnimationContainer from './AnimationContainer.svelte';
  import DistanceIndicators from './DistanceIndicators.svelte';
  import Scrubber from './Scrubber.svelte';
  
  let currentStep = 0;
  let scrubValue = 7; 
  $: currentStepValue = STEPS[currentStep];
  $: showHeader = scrubValue === 7;
  function handleScrubberChange(event: CustomEvent<{ step: number; value: number }>) {
    console.log('Scrubber change:', event.detail);
    currentStep = event.detail.step;
    scrubValue = event.detail.value;
  }
  
  onMount(() => {
    
    const initialStep = STEPS.findIndex(step => step >= scrubValue);
    currentStep = initialStep >= 0 ? initialStep : 0;
    console.log('ListeningArea initialized:', { currentStep, scrubValue, currentStepValue });
  });
</script>

<div class="page-inner">
  <div class="page-content">
    <div class="wrapper">
      <!-- HEADER -->
       
     <div class="page-header">
  {#if showHeader}
    <h1 class="page-title">LISTENING AREA</h1>
    <div class="page-blurb">
      <p>The listening area is the region that an organism can gain information about its environment from the soundscape.<br><em>(Francis et al. 2017)</em></p>
    </div>
  {/if}
</div>


      <!-- ANIMATION CONTAINER -->
      <AnimationContainer {currentStepValue} />

      <!-- BOTTOM CONTROLS -->
      <div class="page-bottom">
        <!-- Distance Indicators -->
        <DistanceIndicators {currentStepValue} />

        <!-- Scrubber -->
        <Scrubber 
          {currentStep}
          {scrubValue}
          on:change={handleScrubberChange}
        />
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="page-footer">
    <div class="container">
      <button
        class="button button-down move-to-next"
        type="button"
        name="button"
        data-parent="listening-area"
        data-target="tips"
        on:click={() => {
          console.log('Navigate to next section');
        }}
      >
        <img
          src="/src/lib/assets/icons/arrow-down.svg"
          width="22"
          height="11"
          alt="Next section"
        />
      </button>
    </div>
  </footer>

  
</div>

<!-- ListeningArea.svelte -->
<style>
  /* Listening Area Container */
  :global(#listening-area) {
    background: #000000;
  }
   /* Fix animation container */
    :global(.animation-container) {
      height: calc(140vh - 300px) !important;
      min-height: 500px;
      overflow: hidden;
    }
  
:global(#listening-area .wrapper){
    background-image: url("/images/listening-background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    background-attachment: fixed;
    position: relative;
    height: 100%;
  }
  
  :global(#listening-area .page-inner) {
    max-width: none;
    width: 100%;
  }
  
  :global(#listening-area .page-header) {
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    text-align: center;
  }
  
  :global(#listening-area .page-header .page-title) {
    font-size: 50px;
    font-weight: 800;
    letter-spacing: 0.07em;
    margin: 0 0 7px;
  }
  
  :global(#listening-area .page-header .page-blurb) {
    font-size: 16px;
    line-height: 22px;
    width: 500px;
    margin: 0 auto;
  }
  
  :global(#listening-area .page-header .page-blurb em) {
    font-weight: 300;
  }
  
  :global(#listening-area .page-content) {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  
  :global(#listening-area .page-bottom) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 115px;
  }
  
  :global(#listening-area .page-footer) {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  
  :global(#listening-area .move-to-next) {
    background: black;
    opacity: 0.4;
  }

  /* Distance Indicators - Scoped to listening area */
  :global(#listening-area .distance) {
    position: relative;
    width: 90%;
    margin: 0 auto 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  
  :global(#listening-area .distance:before) {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: 91%;
    top: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
    background: #ffffff;
  }
  
  :global(#listening-area .distance__indicator) {
    position: relative;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    padding-top: 18px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
  }
  
  :global(#listening-area .distance__indicator:before) {
    content: '';
    display: block;
    width: 1px;
    height: 17px;
    position: absolute;
    top: -7.5px;
    left: 50%;
    margin-left: -.5px;
    background: #ffffff;
  }

  /* Scrubber - Scoped to listening area */
  :global(#listening-area .scrubber) {
    width: 775px;
    background: rgba(255, 255, 255, 0.67);
    padding: 0 7px;
    border-radius: 12px;
    margin: 0 auto;
    position: relative;
  }
  
  :global(#listening-area .scrubber__directions) {
    background: rgba(0, 0, 0, 0.67);
    font-size: 10px;
    line-height: 11px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 14px;
    width: 125px;
    padding: 8px 13px 10px;
    position: absolute;
    left: -155px;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
  }
  
  :global(#listening-area .scrubber__directions:after) {
    content: '';
    display: block;
    height: 12px;
    width: 13px;
    background: url("/src/lib/assets/icons/yellow-arrow.svg");
    position: absolute;
    right: -20px;
    top: 50%;
    margin-top: -6px;
    -webkit-animation: hrz-bounce 2s infinite ease-in-out;
            animation: hrz-bounce 2s infinite ease-in-out;
  }

  @-webkit-keyframes hrz-bounce {
    0%, 20%, 60%, 100% {
      -webkit-transform: translateX(5px);
              transform: translateX(5px);
    }
    40% {
      -webkit-transform: translateX(-5px);
              transform: translateX(-5px);
    }
    80% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
    }
  }

  @keyframes hrz-bounce {
    0%, 20%, 60%, 100% {
      -webkit-transform: translateX(5px);
              transform: translateX(5px);
    }
    40% {
      -webkit-transform: translateX(-5px);
              transform: translateX(-5px);
    }
    80% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
    }
  }

  /* Rangeslider - Scoped to listening area */
  :global(#listening-area .rangeslider) {
    height: 25px;
    position: relative;
    width: 100%;
    z-index: 20;
  }
  
  :global(#listening-area .rangeslider__handle) {
    background: #ffffff;
    height: 15px;
    width: 112px;
    border-radius: 7.5px;
    -ms-touch-action: pan-y;
        touch-action: pan-y;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: 50%;
    margin: -7.5px 0 0;
    -webkit-box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  }
  
  :global(#listening-area .rangeslider__handle:before) {
    font-size: 20px;
    position: absolute;
    top: 35%;
    left: 48%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }

  /* Pips - Scoped to listening area */
  :global(#listening-area .pips) {
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: 0;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    padding: 0 12px;
    
  }
  
  :global(#listening-area .pips:before) {
    content: '';
    height: 2px;
    width: calc(100% - 24px);
    background: #000000;
    display: block;
    position: absolute;
    top: 3px;
  }
  
  :global(#listening-area .pips .pip) {
    height: 8px;
    width: 8px;
    background: #ffffff;
    border: 0.5px solid #000000;
    border-radius: 50%;
    z-index: 9;
    padding: 0;
  }

  /* Animation Container - Scoped to listening area */
  :global(#listening-area .animation-container) {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    position: relative;
    top: -40px;
  }

  :global(#listening-area .bg-masks-slider img) {
    width: 100%;
  }

  /* Hotspots - Scoped to listening area */
  :global(#listening-area .hotspot) {
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }
  
  :global(#listening-area .hotspot__ring) {
    border-radius: 30px;
    height: 50px;
    width: 50px;
    -webkit-animation: pulsate 1s ease-out;
            animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
    opacity: 0;
    position: absolute;
    border-width: 1px;
    border-style: solid;
  }
  
  :global(#listening-area .hotspot__ring--white) {
    border-color: #ffffff;
  }
  
  :global(#listening-area .hotspot__ring--gold) {
    border-color: #ffe385;
    border-width: 3px;
  }
  
  :global(#listening-area .hotspot__indicator) {
    width: 50px;
    height: 50px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    position: relative;
  }
  
  :global(#listening-area .hotspot__indicator:not(.no-hover):hover) {
    height: 200px;
    width: 200px;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px;
    border-radius: 50%;
  }
  
  :global(#listening-area .hotspot__indicator:not(.no-hover):hover .hotspot__ring) {
    -webkit-animation-play-state: paused;
            animation-play-state: paused;
    opacity: 0;
    border-width: 0;
  }
  
  :global(#listening-area .hotspot__indicator:not(.no-hover):hover .hotspot__indicator-image) {
    border: 1px solid #000000;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.7) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#b3ffffff',GradientType=1 );
  }
  
  :global(#listening-area .hotspot__indicator:not(.no-hover):hover .scope-v),
  :global(#listening-area .hotspot__indicator:not(.no-hover):hover .scope-h) {
    opacity: 1;
  }
  
  :global(#listening-area .hotspot__indicator-image) {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    padding: 15px;
    position: relative;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-v),
  :global(#listening-area .hotspot__indicator-image .scope-h) {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 50%;
    opacity: 0;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-v) {
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-v:before),
  :global(#listening-area .hotspot__indicator-image .scope-v:after) {
    content: '';
    display: block;
    height: 10px;
    width: 1px;
    background: #000000;
    position: absolute;
    left: 50%;
    margin-left: -1px;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-v:before) {
    top: 0;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-v:after) {
    bottom: 0;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-h) {
    -webkit-transform: translateX(-50%) rotate(90deg);
            transform: translateX(-50%) rotate(90deg);
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-h:before),
  :global(#listening-area .hotspot__indicator-image .scope-h:after) {
    content: '';
    display: block;
    height: 10px;
    width: 1px;
    background: #000000;
    position: absolute;
    left: 50%;
    margin-left: -1px;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-h:before) {
    top: 0;
  }
  
  :global(#listening-area .hotspot__indicator-image .scope-h:after) {
    bottom: 0;
  }
  
  :global(#listening-area .hotspot__callout) {
    position: absolute;
    width: 420px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.67);
    padding: 20px;
    bottom: 100px;
  }
  
  :global(#listening-area .hotspot__callout:after) {
    content: "";
    display: table;
    clear: both;
  }
  
  :global(#listening-area .hotspot__callout:after) {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 39.0px 22.5px 0 22.5px;
    border-color: rgba(0, 0, 0, 0.67) transparent transparent transparent;
    position: absolute;
    bottom: -44px;
  }
  
  :global(#listening-area .hotspot__name) {
    padding: 3px 20px;
    background: rgba(255, 255, 255, 0.67);
    border: 1px solid #ffffff;
    display: inline-block;
    border-radius: 15px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 20px;
    position: relative;
  }
  
  :global(#listening-area .hotspot__name:before),
  :global(#listening-area .hotspot__name:after) {
    content: '';
    display: block;
    height: 1px;
    background: #ffffff;
    position: absolute;
    z-index: 10;
  }
  
  :global(#listening-area .hotspot__name:before) {
    left: 100%;
    top: 10px;
  }
  
  :global(#listening-area .hotspot__description) {
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    color: #ffffff;
    width: 50%;
    float: left;
  }
  
  :global(#listening-area .hotspot__image) {
    width: 50%;
    float: left;
    position: relative;
  }
  
  :global(#listening-area .hotspot__image:after) {
    content: '';
    display: block;
    height: 4px;
    width: 4px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
  }

  /* Specific Hotspot Positions - Scoped to listening area */
  :global(#listening-area #mate) {
    top: 67%;
    left: 28%;
  }
  
  :global(#listening-area #mate .hotspot__callout) {
    right: -110px;
  }
  
  :global(#listening-area #mate .hotspot__callout:after) {
    right: 110px;
  }
  
  :global(#listening-area #mate .hotspot__name) {
    padding: 3px 20px;
  }
  
  :global(#listening-area #mate .hotspot__name:before) {
    width: 170px;
  }
  
  :global(#listening-area #mate .hotspot__name:after) {
    width: 60px;
    left: calc(100% + 158px);
    top: 34px;
    -webkit-transform: rotate(53deg);
            transform: rotate(53deg);
  }
  
  :global(#listening-area #mate .hotspot__description) {
    width: 50%;
  }
  
  :global(#listening-area #mate .hotspot__image) {
    width: 50%;
  }
  
  :global(#listening-area #mate .hotspot__image:after) {
    top: 17px;
    left: 95px;
  }

  :global(#listening-area #prey) {
    top: 64%;
    left: 39%;
  }
  
  :global(#listening-area #prey .hotspot__indicator-image) {
    padding: 19px;
  }
  
  :global(#listening-area #prey .hotspot__indicator:not(.no-hover):hover .hotspot__indicator-image) {
    padding: 32px;
  }
  
  :global(#listening-area #prey .hotspot__callout) {
    right: -60px;
  }
  
  :global(#listening-area #prey .hotspot__callout:after) {
    right: 60px;
  }
  
  :global(#listening-area #prey .hotspot__name) {
    padding: 3px 20px;
  }
  
  :global(#listening-area #prey .hotspot__name:before) {
    width: 158px;
  }
  
  :global(#listening-area #prey .hotspot__name:after) {
    width: 90px;
    left: calc(100% + 142px);
    top: 44px;
    -webkit-transform: rotate(49deg);
            transform: rotate(49deg);
  }
  
  :global(#listening-area #prey .hotspot__description) {
    width: 60%;
  }
  
  :global(#listening-area #prey .hotspot__image) {
    width: 40%;
    margin-top: -30px;
  }
  
  :global(#listening-area #prey .hotspot__image:after) {
    top: 67px;
    left: 64px;
  }

  :global(#listening-area #red-fox) {
    top: 69%;
    left: 50%;
  }
  
  :global(#listening-area #red-fox .hotspot__indicator-image) {
    padding: 17px;
  }
  
  :global(#listening-area #red-fox .hotspot__indicator:not(.no-hover):hover .hotspot__indicator-image) {
    padding: 40px;
  }
  
  :global(#listening-area #red-fox .hotspot__callout) {
    right: 50%;
    margin-right: -210px;
  }
  
  :global(#listening-area #red-fox .hotspot__callout:after) {
    right: 50%;
    margin-right: -22.5px;
  }
  
  :global(#listening-area #red-fox .hotspot__name) {
    padding: 3px 20px;
  }
  
  :global(#listening-area #red-fox .hotspot__name:before) {
    width: 137px;
  }
  
  :global(#listening-area #red-fox .hotspot__name:after) {
    width: 81px;
    left: calc(100% + 116px);
    top: 44px;
    -webkit-transform: rotate(60deg);
            transform: rotate(60deg);
  }
  
  :global(#listening-area #red-fox .hotspot__description) {
    width: 70%;
  }
  
  :global(#listening-area #red-fox .hotspot__image) {
    width: 30%;
    margin-top: -20px;
  }
  
  :global(#listening-area #red-fox .hotspot__image:after) {
    top: 57px;
    left: 11px;
  }

  :global(#listening-area #predator) {
    top: 68%;
    left: 87%;
  }
  
  :global(#listening-area #predator .hotspot__indicator-image) {
    padding: 19px;
  }
  
  :global(#listening-area #predator .hotspot__indicator:not(.no-hover):hover .hotspot__indicator-image) {
    padding: 30px;
  }
  
  :global(#listening-area #predator .hotspot__callout) {
    right: -34px;
  }
  
  :global(#listening-area #predator .hotspot__callout:after) {
    right: 40px;
  }
  
  :global(#listening-area #predator .hotspot__name) {
    padding: 3px 20px;
  }
  
  :global(#listening-area #predator .hotspot__name:before) {
    width: 119px;
  }
  
  :global(#listening-area #predator .hotspot__name:after) {
    width: 37px;
    left: calc(100% + 112px);
    top: 24px;
    -webkit-transform: rotate(50deg);
            transform: rotate(50deg);
  }
  
  :global(#listening-area #predator .hotspot__description) {
    width: 60%;
    padding-right: 10px;
  }
  
  :global(#listening-area #predator .hotspot__image) {
    width: 40%;
    margin-top: -40px;
  }
  
  :global(#listening-area #predator .hotspot__image:after) {
    top: 37px;
    left: 31px;
  }

  /* Planes - Scoped to listening area */
  :global(#listening-area .planes) {
    position: absolute;
    top: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
    width: 90%;
    height: 100%;
  }
  
  :global(#listening-area .planes .plane) {
    position: absolute;
  }
  
  :global(#listening-area .planes .plane--1) {
    left: 13%;
    top: 12%;
  }
  
  :global(#listening-area .planes .plane--2) {
    left: 32%;
    top: 12%;
  }
  
  :global(#listening-area .planes .plane--3) {
    left: 47%;
    top: 13%;
  }

  /* Animations */
  @-webkit-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
              transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
              transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  @keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
              transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
              transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }
</style>
