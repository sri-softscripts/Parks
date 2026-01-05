<script lang="ts">
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  import * as THREE from 'three';
  import type { Hotspot, Category } from '$lib/data/functional-effects-data';
  
  export let container: HTMLDivElement;
  export let hotspots: Hotspot[];
  export let backgroundTexture: THREE.Texture;
  export let selectedCategory: Category;
  
  // Three.js variables
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let sphere: THREE.Mesh;
  let hotspotMeshes: THREE.Mesh[] = [];
  
  // Interaction variables
  let animationId: number;
  let lon = 0, lat = 0;
  let isDown = false, sx = 0, sy = 0;
  
  // Event handler references
  let mouseDownHandler: (e: MouseEvent) => void;
  let mouseMoveHandler: (e: MouseEvent) => void;
  let mouseUpHandler: () => void;
  let clickHandler: (e: MouseEvent) => void;
  let resizeHandler: () => void;
  
  // Emit events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  // Flag to track if scene is initialized
  let sceneInitialized = false;
  
  onMount(() => {
    initScene();
    
    return () => {
      cleanup();
    };
  });
  
  // Watch for texture changes
  $: if (sceneInitialized && backgroundTexture) {
    updateTexture();
  }
  
  // Watch for hotspot changes
  $: if (sceneInitialized && hotspots) {
    updateHotspots();
  }
  
  function initScene() {
    if (sceneInitialized) return;
    
    console.log('Initializing Three.js scene...');
    
    try {
      // Scene setup
      scene = new THREE.Scene();
      
      // Camera setup
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 1100);
      
      // Renderer setup
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      // Clear container before adding renderer
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);
      
      // Create a simple sphere with basic material first
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // Flip inside out
      
      // Start with a basic material
      const material = new THREE.MeshBasicMaterial({
        color: 0x333333, // Dark gray as fallback
        side: THREE.BackSide
      });
      
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      
      // Add hotspots
      updateHotspots();
      
      // Setup event listeners
      setupEventListeners();
      
      // Start animation
      animate();
      
      sceneInitialized = true;
      console.log('Scene initialized successfully');
      
      // Now update with actual texture if available
      if (backgroundTexture) {
        updateTexture();
      }
      
    } catch (error) {
      console.error('Failed to initialize scene:', error);
    }
  }
  
  function updateTexture() {
    if (!sphere || !backgroundTexture) {
      console.warn('Cannot update texture: sphere or texture not available');
      return;
    }
    
    try {
      console.log('Updating texture...', backgroundTexture);
      
      // Ensure texture is loaded
      if (!backgroundTexture.image || !backgroundTexture.image.complete) {
        console.warn('Texture not fully loaded yet');
        return;
      }
      
      const material = sphere.material as THREE.MeshBasicMaterial;
      
      // Update texture parameters
      backgroundTexture.colorSpace = THREE.SRGBColorSpace;
      backgroundTexture.minFilter = THREE.LinearFilter;
      backgroundTexture.magFilter = THREE.LinearFilter;
      backgroundTexture.generateMipmaps = false;
      backgroundTexture.needsUpdate = true;
      
      // Apply texture to material
      material.map = backgroundTexture;
      material.needsUpdate = true;
      
      console.log('Texture applied successfully');
      
    } catch (error) {
      console.error('Failed to update texture:', error);
    }
  }
  
  function updateHotspots() {
    if (!scene || !hotspots) return;
    
    console.log('Updating hotspots...');
    
    // Remove existing hotspots
    hotspotMeshes.forEach(mesh => {
      scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    hotspotMeshes = [];
    
    // Add new hotspots
    hotspots.forEach((hotspot, index) => {
      try {
        const textureLoader = new THREE.TextureLoader();
        
        textureLoader.load(
          hotspot.thumbnail,
          (texture) => {
            const geometry = new THREE.PlaneGeometry(120, 120);
            const material = new THREE.MeshBasicMaterial({ 
              map: texture,
              transparent: true,
              side: THREE.DoubleSide
            });
            
            const plane = new THREE.Mesh(geometry, material);
            
            plane.position.set(
              hotspot.position.x,
              hotspot.position.y,
              hotspot.position.z
            );
            
            // Make the plane face the center of the sphere
            plane.lookAt(0, 0, 0);
            
            // Store hotspot index for click detection
            plane.userData = { index, hotspotId: hotspot.id };
            
            scene.add(plane);
            hotspotMeshes.push(plane);
          },
          undefined,
          (error) => {
            console.error(`Failed to load hotspot thumbnail for ${hotspot.id}:`, error);
          }
        );
      } catch (error) {
        console.error(`Error creating hotspot ${hotspot.id}:`, error);
      }
    });
  }
  
  function setupEventListeners() {
    // Mouse drag handlers
    mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      sx = e.clientX;
      sy = e.clientY;
      e.preventDefault();
    };
    
    mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      
      lon += (sx - e.clientX) * 0.1;
      lat += (e.clientY - sy) * 0.1;
      lat = Math.max(-85, Math.min(85, lat));
      sx = e.clientX;
      sy = e.clientY;
      e.preventDefault();
    };
    
    mouseUpHandler = () => {
      isDown = false;
    };
    
    // Click handler for hotspot interaction
    clickHandler = (e: MouseEvent) => {
      if (!renderer || !camera) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes);
      
      if (intersects.length > 0) {
        const index = intersects[0].object.userData.index;
        console.log('Hotspot clicked:', index, intersects[0].object.userData.hotspotId);
        dispatch('hotspotclick', { index });
      }
    };
    
    // Resize handler
    resizeHandler = () => {
      if (!camera || !renderer || !container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    // Add event listeners
    container.addEventListener("mousedown", mouseDownHandler);
    container.addEventListener("mousemove", mouseMoveHandler);
    container.addEventListener("mouseup", mouseUpHandler);
    container.addEventListener("click", clickHandler);
    window.addEventListener('resize', resizeHandler);
    
    // Initial resize
    resizeHandler();
  }
  
  function animate() {
    animationId = requestAnimationFrame(animate);
    
    if (!camera || !scene || !renderer) return;
    
    // Convert spherical coordinates to Cartesian
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    
    camera.position.set(
      100 * Math.sin(phi) * Math.cos(theta),
      100 * Math.cos(phi),
      100 * Math.sin(phi) * Math.sin(theta)
    );
    
    camera.lookAt(0, 0, 0);
    
    // Render the scene
    renderer.render(scene, camera);
  }
  
  function cleanup() {
    console.log('Cleaning up Three.js scene...');
    
    // Cancel animation
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    // Remove event listeners
    if (container) {
      if (mouseDownHandler) container.removeEventListener("mousedown", mouseDownHandler);
      if (mouseMoveHandler) container.removeEventListener("mousemove", mouseMoveHandler);
      if (mouseUpHandler) container.removeEventListener("mouseup", mouseUpHandler);
      if (clickHandler) container.removeEventListener("click", clickHandler);
    }
    
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
    }
    
    // Cleanup Three.js resources
    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }
    
    // Dispose geometries and materials
    if (sphere) {
      if (sphere.geometry) sphere.geometry.dispose();
      if (sphere.material) {
        if (Array.isArray(sphere.material)) {
          sphere.material.forEach(mat => mat.dispose());
        } else {
          sphere.material.dispose();
        }
      }
    }
    
    hotspotMeshes.forEach(mesh => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    
    hotspotMeshes = [];
    sceneInitialized = false;
  }
</script>

<div bind:this={container} class="three-scene" />