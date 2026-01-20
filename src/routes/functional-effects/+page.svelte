<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import OptimizedImage from '$lib/components/OptimizedImage.svelte';
    
  import * as THREE from "three";
    import {
    animalHotspots,
    humanHotspots
  } from "$lib/data/hotspots-data";


  let container: HTMLDivElement;
  let selectedCategory: "animals" | "humans" = "animals";
  let activeIndex = -1;
  let showViewer = false;
let hoveredMesh: THREE.Mesh | null = null;
let labelX = 0;
let labelY = 0;

  
  // Three.js variables
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let sphere: THREE.Mesh;
  let hotspotMeshes: THREE.Mesh[] = [];
  let textureLoader: THREE.TextureLoader;
  let bgTextures: Record<"animals" | "humans", THREE.Texture>;
  
  // Animation/Interaction variables
  let animationId: number;
  let lon = 0, lat = 0;
  let isDown = false, sx = 0, sy = 0;
  
  // Event handler references for cleanup
  let mouseDownHandler: (e: MouseEvent) => void;
  let mouseMoveHandler: (e: MouseEvent) => void;
  let mouseUpHandler: () => void;
  let clickHandler: (e: MouseEvent) => void;
  let resizeHandler: () => void;

  function enter360() {
    showViewer = true;
  }


  
  $: hotspots = selectedCategory === "animals" ? animalHotspots : humanHotspots;

  onMount(() => {
    // Initialize texture loader
    textureLoader = new THREE.TextureLoader();
bgTextures = {
  animals: textureLoader.load("/images/animal-background.webp", tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }),
  humans: textureLoader.load("/images/human-background.webp", tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
  })
};
  
    // Setup resize handler
    resizeHandler = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', resizeHandler);
  });

  // Initialize Three.js when showViewer becomes true
  $: if (container && bgTextures && !renderer) {
    initScene();
  }

  function initScene() {
    if (renderer) return;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Sphere
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(500, 60, 40).scale(-1, 1, 1),
      new THREE.MeshBasicMaterial({
        map: bgTextures[selectedCategory]
      })
    );
    scene.add(sphere);

    // Hotspots
    addHotspots();

    // Setup event handlers
    setupEventListeners();

    // Start animation loop
    animate();
  }

  function setupEventListeners() {
    // Mouse drag handlers
    mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      sx = e.clientX;
      sy = e.clientY;
    };
    
    mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      lon += (sx - e.clientX) * 0.1;
      lat += (e.clientY - sy) * 0.1;
      lat = Math.max(-85, Math.min(85, lat));
      sx = e.clientX;
      sy = e.clientY;
    };
    
    mouseUpHandler = () => {
      isDown = false;
    };

    // Click handler for hotspot interaction
    clickHandler = (e: MouseEvent) => {
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(hotspotMeshes);
      
      if (hit.length) {
        activeIndex = hit[0].object.userData.index;
      }
    };

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const mouseHoverHandler = (e: MouseEvent) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(hotspotMeshes);

  hoveredMesh = hits.length ? (hits[0].object as THREE.Mesh) : null;
};

window.addEventListener("mousemove", mouseHoverHandler);



    // Add event listeners
    container.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("click", clickHandler);
  }

  function updateLabelPosition(mesh: THREE.Mesh) {
  const vector = mesh.position.clone();
  vector.project(camera);

  labelX = (vector.x * 0.5 + 0.5) * window.innerWidth;
  labelY = (-vector.y * 0.5 + 0.5) * window.innerHeight;
}

  function cleanupEventListeners() {
    if (mouseDownHandler) container.removeEventListener("mousedown", mouseDownHandler);
    if (mouseMoveHandler) window.removeEventListener("mousemove", mouseMoveHandler);
    if (mouseUpHandler) window.removeEventListener("mouseup", mouseUpHandler);
    if (clickHandler) window.removeEventListener("click", clickHandler);

  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    
    if (!camera) return;
    
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    
    camera.position.set(
      100 * Math.sin(phi) * Math.cos(theta),
      100 * Math.cos(phi),
      100 * Math.sin(phi) * Math.sin(theta)
    );
    camera.lookAt(0, 0, 0);
    
    if (renderer && scene && camera) {
hotspotMeshes.forEach(mesh => {
  const mat = mesh.material as THREE.MeshBasicMaterial;
  

  if (mesh === hoveredMesh) {
    mat.color.setRGB(0.7, 0.7, 0.7);
    updateLabelPosition(mesh);
  } else {
     mat.color.setRGB(1, 1, 1);
    
  }
});


      renderer.render(scene, camera);
    }
  }

function addHotspots() {
  // Remove old hotspots
  hotspotMeshes.forEach(mesh => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });
  hotspotMeshes = [];

  hotspots.forEach((hotspot, i) => {
    // Load texture with correct color space
    const texture = textureLoader.load(hotspot.thumbnail, tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(170, 155);

    const plane = new THREE.Mesh(geometry, material);

    // Position hotspot
    plane.position.set(
      hotspot.position.x,
      hotspot.position.y,
      hotspot.position.z
    );

    // Make plane face the center of the sphere
    plane.lookAt(0, 0, 0);

    // Store index for raycasting
    plane.userData.index = i;

    scene.add(plane);
    hotspotMeshes.push(plane);
  });
}


  // Update sphere texture when category changes
  $: if (scene && sphere && bgTextures) {
    const material = sphere.material as THREE.MeshBasicMaterial;
    material.map = bgTextures[selectedCategory];
    material.needsUpdate = true;

    if (scene) {
      addHotspots();
      activeIndex = -1;
    }
  }

  // Navigation functions
  const next = () => activeIndex = (activeIndex + 1) % hotspots.length;
  const prev = () => activeIndex = (activeIndex - 1 + hotspots.length) % hotspots.length;
  const closePanel = () => activeIndex = -1;

  onDestroy(() => {
    // Cleanup animation frame
    if (animationId) cancelAnimationFrame(animationId);
    
    // Cleanup event listeners
    cleanupEventListeners();
    
    // Cleanup resize handler
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    
    // Cleanup Three.js resources
    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    }
    
    // Dispose geometries and materials
    if (sphere) {
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
    }
    
    hotspotMeshes.forEach(mesh => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
  });
</script>




<div
  class="overlay-360 {showViewer ? 'hidden' : ''}"
  on:click={enter360}
>
  <div class="overlay-content">
    <OptimizedImage src="/icons/icon-360.svg" loading="eager" alt="360" width={100}  height={100} priority={true} />
    <span>360<sup>0</sup> Experience</span>
  </div>
</div>


<div class="page-header">
                <h1 class="page-title">Functional Effects</h1>
                <div class="sub-title">
                   THE BEHAVIORAL, PHYSIOLOGICAL, AND ECOLOGICAL CONSEQUENCES OF NOISE
                </div>
  <div class="page-blurb">
    <p class="blurb-desc">
      When these effects are combined with other stressors such as winter weather, disease,
      and food shortages, functional effects of noise can have a big impact on the health
      and vitality of wildlife populations within a park.
    </p>
    <div class="switch-field">
      <input type="radio" id="switch_left" name="effects" value="animals" bind:group={selectedCategory}>
      <label for="switch_left"><img src="/icons/icon-animals.svg" alt=""> Effects on animals</label>

      <input type="radio" id="switch_right" name="effects" value="humans" bind:group={selectedCategory}>
      <label for="switch_right">Effects on humans <img src="/icons/icon-humans.svg" alt=""></label>
    </div>
  </div>
  
  </div>
  
{#if hoveredMesh}
  <div
    class="hotspot-text"
    style="top:{labelY}px; left:{labelX}px"
  >
    {hotspots[hoveredMesh.userData.index].id}
  </div>
{/if}


  <div bind:this={container} class="viewer"></div>
  



{#if activeIndex > -1}
  {@const item = hotspots[activeIndex]}
<div class="info-background">
    <div class="info-panel {selectedCategory}" id={item.id} rel={item.id}>
    <div class="photo-wrapper">
      <img loading="lazy" src={item.image} alt={item.title}>
    </div>
    <div class="content-wrapper">
      <div class="back-to-panolens close-icon" on:click={closePanel}>
        <OptimizedImage
  src="/icons/closeX.svg"
  alt=""
  width={16}
  height={16}
/>
      </div>
      <div class="upper-content">
        <h2>{item.title}</h2>
        <p>{item.description} <em>{item.citation}</em></p>
        {#if selectedCategory === "animals"}
          <h3>Affected Animal Behavior:</h3>
          <ul>
            {#each item.behaviors as b}
              <li class="{b.class} {b.active ? 'active' : ''}">
                <div class="icon-inner-div">
                <img loading="lazy" src={b.icon} alt="">
                </div>{b.name}
              </li>
            {/each}
          </ul>
        {:else}
          <h3>Effects on Humans:</h3>
          <ul>
            {#each item.effects as e}
              <li class="{e.class} {e.active ? 'active' : ''}">
                <div class="icon-inner-div">
                <img loading="lazy" src={e.icon} alt=""></div>{e.name}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
      <div class="lower-content">
        <div class="third back-to-panolens">
          <button class="btn-pano-close" on:click={closePanel}>
            <img loading="lazy" src="/icons/back-360.svg" alt=""> Back to 360° Experience
          </button>
        </div>
        <div class="third">
          <button class="progress-button" on:click={prev}>
            <div class="control">
              <img loading="lazy" src="/icons/arrow-left.svg" alt="">
            </div>
            <div class="img">
              <img loading="lazy" src={hotspots[(activeIndex-1+hotspots.length)%hotspots.length].image} alt="">
            </div>
          </button>
        </div>
        <div class="third">
          <button class="progress-button" on:click={next}>
            <div class="control">
              <img loading="lazy" src="/icons/arrow-right.svg" alt="">
            </div>
            <div class="img">
              <img loading="lazy" src={hotspots[(activeIndex+1)%hotspots.length].image} alt="">
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  
</div>

{/if}




<style>

.hotspot-text {
  position: fixed;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;
  pointer-events: none;
  z-index: 10;
  /* white-space: nowrap; */
}

.hotspot-text {
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}


  .overlay-360 {
    position: absolute;
    top: 76px;
    left: 0;
    width: 100%;
    height: calc(100% - 76px);
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000000;
    cursor: pointer;
  }
  .overlay-360.hidden {
  opacity: 0;
  pointer-events: none;
}

  .overlay-content {
    text-align: center;
    color: white;
  }

  .overlay-content img {
    margin-bottom: 20px;
    animation: pulse 2s infinite;
  }

  .overlay-content span {
    font-size: 24px;
    font-weight: bold;
    display: block;
  }

  .overlay-content sup {
    font-size: 14px;
    vertical-align: super;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }




/* Fullscreen 360° viewer */
.viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  cursor: grab;
}

.viewer:active {
  cursor: grabbing;
}

  /* Page header */
  .page-header {
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    z-index: 5000;
    color: white;
    max-width: 670px;
    margin: 0 auto;
    pointer-events: none;
    
  }

  .page-title {
    font-size: 52px;
    font-weight: 800;
    margin-bottom: 10px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.1em;
    color:#000;
  }

  .sub-title {
    font-size: 15px;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-weight: bold;
    color:#000;
  }

  .page-blurb {
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 8px;
    pointer-events: auto;
    max-width: 570px;
    margin: 0 auto;
    text-align: center;
  }

  .blurb-desc {
    margin-bottom: 20px;
    line-height: 1.5;
    font-size: 16px;
  }

  /* Toggle switch */
  .switch-field {
    display: flex;
    background: rgba(197, 197, 197, 1);
    border-radius: 30px;
    padding: 0;
    max-width: 440px;
    margin: 0 auto;
    overflow: hidden;
  }

  .switch-field input {
    display: none;
  }

  .switch-field label {
    flex: 1;
    padding: 10px 30px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    height: 33px;
    color: white;
  }

  .switch-field label:first-of-type {
    border-radius: 30px 0 0 30px;
    padding-left: 30px;
  }

  .switch-field label:last-of-type {
    border-radius: 0 30px 30px 0;
    padding-right: 30px;
  }

  .switch-field input:checked + label {
    background: #000;
    color: white;
  }

  .switch-field label img {
    width: 26px;
    height: 26px;
  }

  .info-panel {
position: absolute;
    top: 106px;
    left: 30px;
    /* transform: translate(-50%, -50%); */
    width: calc(100% - 60px);
    height: calc(100% - 136px);
    background: white;
    /* border-radius: 8px; */
    overflow: hidden;
      box-shadow:
    0 0 0 30px rgba(0, 0, 0, 0.75),
    0 20px 50px rgba(0, 0, 0, 0.5);
    /* box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);  */
    z-index: 10000;
    display: flex;
    transition: opacity 0.3s ease;
}

.photo-wrapper {
    width: 67%;
    height: 100%;
    flex-shrink: 0;
    background: #f5f5f5;
  }

  .photo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-wrapper {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: white;
  }

  .close-icon {
    position: absolute;
    top: 20px;
    right: 40px;
    cursor: pointer;
    z-index: 10;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 50%;
    transition: background 0.3s;
  }

  .close-icon:hover {
    background: #e0e0e0;
  }

  .close-icon img {
    width: 16px;
    height: 16px;
  }

  .upper-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
    padding:50px 30px 40px 50px;
  }

  .upper-content h2 {
    font-size: 30px;
    margin-bottom: 15px;
    color: #333;
    text-transform: uppercase;
    padding-bottom: 10px;
    border-bottom: 2px solid #C5C5C5;
    font-family: 'Coda', sans-serif;
  }

  .upper-content p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 80px;
    color: #666;
  }

  .upper-content p em {
    font-weight: 300;
    font-style: italic;
    color: #888;
  }

  .upper-content h3 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #333;
    font-weight: 700;
    text-transform: uppercase;
  }

  .upper-content ul {
    list-style: none;
    display: flex;
    gap: 25px;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    width:100%;
    justify-content: flex-start;
  }

  .upper-content ul.humans {
    justify-content: flex-start;
  }

  .upper-content ul.humans li {
    margin-right: 20px;
  }

  .upper-content ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 70px;
    font-size: 11px;
    text-transform: uppercase;
    color: #999;
    text-align: center;
    font-weight: 700;
  }

  .upper-content ul li.active {
    color: #333;
  }

  .upper-content ul li.active.icon-mating {
    color: #D8400B;
  }

  .upper-content ul li.active.icon-habitat-patterns {
    color: #2970C0;
  }

  .upper-content ul li.active.icon-hunting {
    color: #FFB300;
  }

  .upper-content ul li.active.icon-predator-avoidance {
    color: #509917;
  }

  .upper-content ul li.active.icon-benefit {
    color: #509917;
  }

  .upper-content ul li.active.icon-negative {
    color: #D8400B;
  }



  .upper-content ul li img {
    width: 30px;
    height: 30px;
  }

    .icon-inner-div{
      border-radius: 60%;
    background-color: #E0E0E0;
    transition: all 0.3s;
    padding: 11px 12px;
  }


  .upper-content ul li.active.icon-mating .icon-inner-div {
    background: #D8400B;
  }

  .upper-content ul li.active.icon-habitat-patterns .icon-inner-div {
    background: #2970C0;
  }

  .upper-content ul li.active.icon-hunting .icon-inner-div {
    background: #FFB300;
  }

  .upper-content ul li.active.icon-predator-avoidance .icon-inner-div {
    background: #509917;
  }

  .upper-content ul li.active.icon-benefit .icon-inner-div {
    background: #509917;
  }

  .upper-content ul li.active.icon-negative .icon-inner-div {
    background: #D8400B;
  }

  /* Navigation buttons */
  .lower-content {
    display: flex;
    margin-top: 20px;
    /* height: 135px; */
    height:20.5%;
    width:100%;
    justify-content: flex-end;
  }

  .third {
    /* flex: 1; */
    height: 100%;
    width: 100%;
  }

  .btn-pano-close,
  .progress-button {
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding: 0;
    border-radius: 5px;
  }

  .btn-pano-close {
    background: #C5C5C5;
    color: #333;
    border-radius:0;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    /* width:150px; */
    width:100%;
  }

  .btn-pano-close:hover {
    background: #B0B0B0;
  }

  .btn-pano-close img {
    width: 24px;
    height: 22px;
  }

  .progress-button {
    background: transparent;
    position: relative;
   border-radius:0;
   /* width:150px; */
   width:100%;
  }

  .progress-button:hover {
    border-color: #C5C5C5;
  }

  .progress-button:hover .img {
    transform: scale(1.05);
  }

  .progress-button .control {
    position: absolute;
    height:100%;
    width:100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center; 
    z-index: 2;
    transition: background 0.3s;
  }

  .progress-button .control img {
    width: 36px;
    height: 36px;
  }

  .progress-button .img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
  }

  .progress-button .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


/* Hotspot scaling */
.mesh-hover {
  transform: scale(1.2);
  transition: transform 0.2s;
}

/* Responsive adjustments */
@media(max-width: 768px){
  .info-panel {
    flex-direction: column;
    width: 90%;
  }
  .photo-wrapper {
    max-width: 100%;
    height: 200px;
  }
  .content-wrapper {
    padding: 12px;
  }
  .lower-content {
    flex-direction: column;
    gap: 8px;
  }
}

</style>
