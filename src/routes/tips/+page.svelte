<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { tipsHotspots } from "$lib/data/tipsHotspots";

  let container: HTMLDivElement;
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
  let bgTexture: THREE.Texture;

  // Animation/Interaction variables
  let animationId: number;
  let lon = 0,
    lat = 0;
  let isDown = false,
    sx = 0,
    sy = 0;

  // Event handler references for cleanup
  let mouseDownHandler: (e: MouseEvent) => void;
  let mouseMoveHandler: (e: MouseEvent) => void;
  let mouseUpHandler: () => void;
  let clickHandler: (e: MouseEvent) => void;
  let resizeHandler: () => void;

  function enter360() {
    showViewer = true;
  }

let showSummary = false;

function toggleSummary() {
  showSummary = !showSummary;
}

function closeSummary() {
  showSummary = false;
}


  onMount(() => {
    // Initialize texture loader
    textureLoader = new THREE.TextureLoader();
    // bgTexture = textureLoader.load("/images/tips-background.webp"); // Update with your image path
     bgTexture = textureLoader.load("/images/tips-background.webp", tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
  })

    // Setup resize handler
    resizeHandler = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", resizeHandler);
  });

  // Initialize Three.js when showViewer becomes true
  $: if (container && bgTexture && !renderer) {
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
        map: bgTexture,
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
    if (mouseDownHandler)
      container.removeEventListener("mousedown", mouseDownHandler);
    if (mouseMoveHandler)
      window.removeEventListener("mousemove", mouseMoveHandler);
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
      hotspotMeshes.forEach(mesh => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });
    hotspotMeshes = [];

    // // Add new hotspots
    // tipsHotspots.forEach((hotspot, i) => {
    //   const plane = new THREE.Mesh(
    //     new THREE.PlaneGeometry(120, 120),
    //     new THREE.MeshBasicMaterial({
    //       map: new THREE.TextureLoader().load(hotspot.thumbnail),
    //       transparent: true,
    //     })
    //   );

    //   // Position the hotspot
    //   plane.position.set(
    //     hotspot.position.x,
    //     hotspot.position.y,
    //     hotspot.position.z
    //   );

    //   // Make it face the camera
    //   plane.lookAt(0, 0, 0);
    //   plane.userData.index = i;

    //   scene.add(plane);
    //   hotspotMeshes.push(plane);
    // });

      tipsHotspots.forEach((hotspot, i) => {
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

  // Navigation functions
  const next = () => (activeIndex = (activeIndex + 1) % tipsHotspots.length);
  const prev = () =>
    (activeIndex =
      (activeIndex - 1 + tipsHotspots.length) % tipsHotspots.length);
  const closePanel = () => {
  activeIndex = -1;
  showSummary = false;
};

  onDestroy(() => {
    // Cleanup animation frame
    if (animationId) cancelAnimationFrame(animationId);

    // Cleanup event listeners
    cleanupEventListeners();

    // Cleanup resize handler
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);

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

    hotspotMeshes.forEach((mesh) => {
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
    <img loading="lazy" src="/icons/icon-360.svg" alt="360" width="100">
    <span>360<sup>0</sup> Experience</span>
  </div>
</div>

  <div class="page-header">
    <h1 class="page-title">Tips</h1>
    <div class="sub-title">FOR MANAGING SOUNDSCAPES</div>
    <div class="page-blurb">
      <p>
        Learn from park employees and scientists about soundscape management
        tips that can reduce noise emissions and increase visitor engagement and
        enjoyment of acoustic resources.
      </p>
    </div>
  </div>

  {#if hoveredMesh}
  <div
    class="hotspot-text"
    style="top:{labelY}px; left:{labelX}px"
  >
    {tipsHotspots[hoveredMesh.userData.index].id}
  </div>
{/if}
  <div bind:this={container} class="viewer"></div>


{#if activeIndex > -1}
  {@const item = tipsHotspots[activeIndex]}
  <section id="tips" class="tips">
    <div class="page-inner">
      <div class="info-panel tip" id={item.id} rel={item.id}>
        <div class="photo-wrapper">
          <img loading="lazy" src={item.image} alt={item.title} />
        </div>
        <div class="content-wrapper">
          <div class="back-to-panolens close-icon" on:click={closePanel}>
            <img width="16" src="/icons/closeX.svg" alt="" />
          </div>
          <div class="upper-content">
            <h2>{item.title}</h2>
<div class="tips-full-col">
            <div class="content-row">
              <div class="content-col">
                {@html item.content}
              </div>
            </div>
            {#if item.highlight}
              <div class="content-col">
                <div class="content-quote">
                  {item.highlight}
                </div>
              </div>
            {/if}
</div>
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
                  <img loading="lazy" src="/icons/arrow-left.svg" alt="" />
                </div>
                <div class="img">
                  <img
                    loading="lazy"
                    src={tipsHotspots[
                      (activeIndex - 1 + tipsHotspots.length) %
                        tipsHotspots.length
                    ].image}
                    alt=""
                  />
                </div>
              </button>
            </div>
            <div class="third">
              <button class="progress-button" on:click={next}>
                <div class="control">
                  <img loading="lazy" src="/icons/arrow-right.svg" alt="" />
                </div>
                <div class="img">
                  <img
                    loading="lazy"
                    src={tipsHotspots[(activeIndex + 1) % tipsHotspots.length]
                      .image}
                    alt=""
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

    <div
    class="summary-pannel
      {showSummary ? 'active toTop' : ''}"
  >
    <!-- Summary Toggle Button -->
    <div
      class="button-summary {showSummary ? 'active' : ''}"
      on:click={toggleSummary}
    >
      <span>SUMMARY OF TIPS</span>
    </div>
    <div class="summary-wrap">
      <div class="summary-container">
        <div class="summary-header">
          SUMMARY: TIPS AT A GLANCE
        </div>

        <div class="summary-content">
          <div class="summary-lists-wrap">
            <div class="summary-lists">
              <div class="list"><span>1</span>Use quiet technology</div>
              <div class="list"><span>2</span>Work with maintenance crews</div>
              <div class="list">
                <span>3</span>Follow management-by-objectives frameworks
              </div>
              <div class="list">
                <span>4</span>Use education and interpretation
              </div>
            </div>

            <div class="summary-lists">
              <div class="list">
                <span>5</span>Engage visitors with soundscapes
              </div>
              <div class="list">
                <span>6</span>Use zoning effectively
              </div>
              <div class="list">
                <span>7</span>Consider site design
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="summary-footer">
        <div class="third back">
          <button class="btn-pano-close" on:click={closeSummary}>
            <img src="/icons/back-360.svg" alt="" />
            Back to 360° <br />Experience
          </button>
        </div>

        <div class="third">
          <button class="close-summary" on:click={closeSummary}>
            <img src="/icons/close_white_icon.svg" alt="" />
            <span>close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
    </div>
  </section>
{/if}

<style>
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
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  /* Fullscreen 360° viewer */
  .viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    
    /* background: url(/images/tip-gradient.png) no-repeat center top; */
    /*  background-color: #ccc;  */
    /*  background-size: 100% auto;  */
  }
  .page-title {
    font-size: 52px;
    letter-spacing: 0.1em;
    margin: 0 0 39px;
    font-weight: 800;
    text-transform: uppercase;
    text-align: center;
    margin: 0px;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.16);
  }
 .sub-title {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
    margin: 0px;
  }
  .page-header .blurb-desc {
    text-shadow: 0px 3px 15px rgba(0, 0, 0, 0.85);
    margin-top: 1.5em;
  }
  .page-header .page-blurb {
    font-size: 16px;
    line-height: 22px;
    max-width: 570px;
    margin: 0 auto;
    text-align: center;
  }
 /* .info-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
    width: 1226px;
    height: 580px;
    background: #fff;

    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;

    min-width: 200px;
    min-height: 250px;

    color: #000;
    border-radius: 3px;
  } */


    .info-panel {
position: absolute;
    top: 106px;
    left: 30px;
    /* transform: translate(-50%, -50%); */
    width: calc(100% - 60px);
    height: calc(100% - 136px);
    /* background: white; */
    /* border-radius: 8px; */
    overflow: hidden;
      box-shadow:
    0 0 0 30px rgba(0, 0, 0, 0.75),
    0 20px 50px rgba(0, 0, 0, 0.5);
        /* box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);  */
    z-index: 10000;
    display: flex;
    transition: opacity 0.3s ease;
 background: rgba(0, 0, 0, 0.75);
}
.tips-full-col{
  display:flex;
  gap:15px;
}

#zoning .photo-wrapper {
width:47%;
}
  #zoning .content-wrapper {
  width:53%;
    }


    #framework .photo-wrapper{
       position:absolute;
      top:0;
      left:0;
      width: 60%; 
      z-index: inherit;
    }




    #framework .content-wrapper{
      width:58%;
position:absolute;
right:0;
height: calc(100% - 30px);
/* bottom:30px; */
    }


            #tech .photo-wrapper{
       position:absolute;
      top:0;
      left:0;
      width: 45%; 
      z-index: inherit;
    }

    #tech .content-wrapper{
      width:63%;
position:absolute;
right:0;
height: calc(100% - 30px);
/* bottom:30px; */
    }




            #education .photo-wrapper{
       position:absolute;
      top:0;
      left:0;
      width: 42%; 
      z-index: inherit;
    }

    #education .content-wrapper{
      width:66%;
position:absolute;
right:0;
height: calc(100% - 30px);
/* bottom:30px; */
    }


#education .content-wrapper::before ,
 #tech .content-wrapper::before ,
    #framework .content-wrapper::before {
  content: "";
  position: absolute;
  left: -33px;          /* push arrow outside */
  top: 80px;            /* vertical alignment */
  width: 0;
  height: 0;
  border-top: 35px solid transparent;
  border-bottom: 35px solid transparent;
  border-right: 45px solid #fff; 
  z-index: inherit;
}
#education.info-panel ,
#tech.info-panel ,
    #framework.info-panel{
      left:0;
    height: calc(100% - 106px);
       width: calc(100% - 30px) !important;

    }

.photo-wrapper {
  position:relative;
    /* width: 40%; */
    height: 100%;
    flex-shrink: 0;
    /* background: #f5f5f5; */
          /* background: rgba(0, 0, 0, 0.75); */
  }

    .photo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }



  .content-wrapper {
    /* width:53%; */
    height: 100%;
    /* padding: 30px; */
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
padding: 30px;
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
.info-panel .content-wrapper .upper-content p em {
    font-weight: 300;
  }
.info-panel .content-wrapper .upper-content ol li {
    margin-bottom: 20px;
    font-size: 0.875em;
    line-height: 1.35714em;
    font-weight: 400;
  }
.info-panel .content-wrapper .upper-content ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    margin: 0px;
    padding: 0px;
    list-style: none;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    width: 90%;
  }
  .tips .info-panel .content-wrapper .upper-content ul.humans {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .tips .info-panel .content-wrapper .upper-content ul.humans li {
    margin-right: 20px;
  }
  .tips .info-panel .content-wrapper .upper-content ul li {
    position: relative;
    display: block;
    background-color: #c5c5c5;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    font-size: 0.625em;
    text-transform: uppercase;
    color: #c5c5c5;
    text-align: center;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
  }
  .tips .info-panel .content-wrapper .upper-content ul li.active.icon-mating {
    color: #d8400b;
    background-color: #d8400b;
  }
  .tips
    .info-panel
    .content-wrapper
    .upper-content
    ul
    li.active.icon-habitat-patterns {
    color: #2970c0;
    background-color: #2970c0;
  }
  .tips .info-panel .content-wrapper .upper-content ul li.active.icon-hunting {
    color: #ffe385;
    background-color: #ffe385;
  }
  .tips
    .info-panel
    .content-wrapper
    .upper-content
    ul
    li.active.icon-predator-avoidance {
    color: #509917;
    background-color: #509917;
  }
  .tips .info-panel .content-wrapper .upper-content ul li.active.icon-benefit {
    color: #509917;
    background-color: #509917;
  }
  .tips .info-panel .content-wrapper .upper-content ul li.active.icon-negative {
    color: #d8400b;
    background-color: #d8400b;
  }
  .tips .info-panel .content-wrapper .upper-content ul li img {
    width: 56px;
    height: 56px;
    padding: 20%;
    margin-bottom: 8px;
  }
  .content-quote {
    background: rgba(237, 187, 62, 0.17);
    padding: 25px 40px;
    color: #d6ad4a;
    font-style: italic;
    font-size: 0.875em;
    line-height: 1.5em;
    font-weight: bold;
    position: relative;
  }
  .tips .info-panel .content-wrapper .upper-content .content-quote:before {
    content: "";
    display: block;
    width: 56px;
    height: 56px;
    position: absolute;
    left: -28px;
    top: 30px;
    background: url(/icons/quote.svg) no-repeat center center;
    background-size: cover;
  }
 .lower-content {
    display: flex;
    /* gap: 20px; */
    margin-top: 20px;
    margin-bottom:20px;
    height: 135px;
    justify-content: flex-end;
    /* margin-right:-29px; */
    background-color: #e5e5e5;
  }

  .third {
    /* flex: 1; */
    height: 100%;
  }
  /* .tips .info-panel .content-wrapper .lower-content .third.back {
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #c5c5c5;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  } */
  /* .tips .info-panel .content-wrapper .lower-content .third.back button {
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: #c5c5c5;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #575757;
    font-size: 0.625em;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    outline: 0px;
    border: 0px;
  } */
  /* .tips .info-panel .content-wrapper .lower-content .third.back button img {
    width: 20px;
    height: 18px;
    margin-bottom: 10px;
  } */
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
    width:150px;
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
   /* border: 2px solid #E0E0E0; */
   border-radius:0;
   width:150px;
  }



  .progress-button:hover {
    border-color: #C5C5C5;
  }

  .progress-button:hover .img {
    transform: scale(1.05);
  }
.progress-button .control {
    position: absolute;
    /* top: 50%; */
    /* transform: translateY(-50%); */
    /* width: 35px;
    height: 35px; */
    height:100%;
    width:100%;
    background: rgba(0, 0, 0, 0.6);
    /* border-radius: 50%;*/
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

  /* Hotspot scaling */
.mesh-hover {
  transform: scale(1.2);
  transition: transform 0.2s;
}


  .tips .info-panel.panel-new {
    background: transparent;
    overflow: visible;
  }
  .tips .info-panel.panel-new .photo-wrapper {
    width: 416px;
    position: relative;
    z-index: 10;
  }
  .tips .info-panel.panel-new .photo-wrapper img {
    max-width: none;
    width: 535px;
    margin-left: -27px;
  }
  .tips .info-panel.panel-new .content-wrapper {
    width: 810px;
    z-index: 9;
    background: #ffffff;
  }
  .tips .info-panel.panel-new .content-wrapper:before {
    content: "";
    display: block;
    position: absolute;
    border-top: 22px solid transparent;
    border-bottom: 22px solid transparent;
    border-right: 30px solid white;
    right: 100%;
    top: 90px;
  }
  .tips .info-panel#tip-framework .photo-wrapper img {
    width: 640px;
  }






.summary-pannel {
  position: fixed;
  width: calc(100% - 60px);
  bottom: calc((-100% + 150px));
  display: block;
  height: calc(100% - 150px);
  -webkit-transition: top 1s ease-in-out;
  transition: top 1s ease-in-out;
  background: #ffffff;
  z-index: 50040;
  left: 50%;
  /* top:76px; */
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%); }

  .summary-pannel.toTop {
    top: 110px; }
  .summary-pannel .button-summary {
    position: absolute;
    right: 20px;
    top: -1px;
    color: #ffffff;
    background-color: #EDBB3E;
    padding: 10px 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    float: right;
    margin-right: 20px;
    margin-top: -40px;
    cursor: pointer;
    -webkit-box-shadow: -2px -2px 6px rgba(0, 0, 0, 0.16);
            box-shadow: -2px -2px 6px rgba(0, 0, 0, 0.16);
    font-weight: 700; }
    .summary-pannel .button-summary.active span:after {
      content: '\f103'; }
    .summary-pannel .button-summary span {
      font-size: 10px;
      text-transform: uppercase; }
      .summary-pannel .button-summary span:after {
        font-size: 15px;
        content: '\f102';
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        font-family: 'FontAwesome'; }
.summary-pannel .summary-wrap {
  display:none;

}

/* don't remove this style */
.summary-pannel.active .summary-wrap {
  display:block !important;
  height: 580px;
  background: #ffffff; 
}

.summary-container {
  padding: 60px;
  padding-bottom: 150px; }

.summary-header {
  font-family: "Coda";
  font-weight: 800;
  font-size: 30px;
  border-bottom: 1px solid #C4C4C4;
  color: #575757; }

.summary-content {
  padding: 40px 50px 19px; }
  .summary-content .summary-lists-wrap:after {
    content: "";
    display: table;
    clear: both; }
  .summary-content .summary-lists-wrap .summary-lists {
    float: left;
    width: 50%; }
    .summary-content .summary-lists-wrap .summary-lists .list {
      padding-left: 50px;
      line-height: 19px;
      position: relative;
      margin-bottom: 40px;
      padding-right: 80px; }
      .summary-content .summary-lists-wrap .summary-lists .list span {
        background-color: #EDBB3E;
        width: 39px;
        height: 39px;
        border-radius: 50%;
        line-height: 39px;
        display: inline-block;
        text-align: center;
        font-size: 19px;
        font-family: "Coda";
        font-weight: 800;
        color: #ffffff;
        position: absolute;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
                transform: translateY(-50%); }

.summary-footer {
  background-color: #e5e5e5;
  text-align: right;
  font-size: 0;
  position: absolute;
  width: 100%;
  bottom: 15px; }
  .summary-footer .third {
    text-align: right;
    vertical-align: middle;
    height: 134px;
    width: 148px;
    display: inline-block;
    font-size: 10px; }
    .summary-footer .third button {
      font-size: 10px;
      width: 100%;
      height: 100%;
      text-align: center;
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      border: 0;
      background-color: #C5C5C5;
      line-height: 14px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer; }
      .summary-footer .third button img {
        max-width: 20px;
        margin: auto auto 10px;
        display: block; }
      .summary-footer .third button.close-summary {
        background-color: #EDBB3E;
        color: #ffffff; }
</style>