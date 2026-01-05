<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
	import { onMount, onDestroy } from 'svelte';
	import type { Hotspot as HotspotType } from '../data/functional-effects-data';

	interface Props {
		panoramaImage: string;
		hotspots: HotspotType[];
		onHotspotClick: (panelId: string) => void;
	}

	let { panoramaImage, hotspots, onHotspotClick }: Props = $props();

	const { scene, camera, renderer } = useThrelte();
	let texture: THREE.Texture | null = null;
	let sphereMesh: THREE.Mesh | null = null;
	let spriteGroup: THREE.Group | null = null;
	let raycaster: THREE.Raycaster | null = null;
	let mouse: THREE.Vector2 | null = null;
	let hoveredSprite: THREE.Sprite | null = null;
	let cleanupFunctions: (() => void)[] = [];

	// Setup hotspots when context is ready
	$effect(() => {
		if (!scene || !camera || !renderer || !renderer.domElement) return;

		// Cleanup previous setup
		cleanupFunctions.forEach((fn) => fn());
		cleanupFunctions = [];

		// Load panorama texture
		const loader = new THREE.TextureLoader();
		loader.load(
			panoramaImage,
			(loadedTexture) => {
				texture = loadedTexture;
				if (sphereMesh && sphereMesh.material) {
					(sphereMesh.material as THREE.MeshBasicMaterial).map = texture;
					(sphereMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
				}
			},
			undefined,
			(error) => {
				console.error('Error loading panorama:', error);
			}
		);

		// Setup hotspots
		spriteGroup = new THREE.Group();
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();

		hotspots.forEach((hotspot) => {
			const hotspotLoader = new THREE.TextureLoader();
			hotspotLoader.load(
				hotspot.image,
				(spriteTexture) => {
					const spriteMaterial = new THREE.SpriteMaterial({
						map: spriteTexture,
						transparent: true,
						opacity: 0.9
					});

					const sprite = new THREE.Sprite(spriteMaterial);
					sprite.position.set(...hotspot.position);
					sprite.scale.set(2000, 2000, 1);
					sprite.userData = { panelId: hotspot.panelId };
					if (spriteGroup) {
						spriteGroup.add(sprite);
					}
				},
				undefined,
				(error) => {
					console.error('Error loading hotspot image:', error);
				}
			);
		});

		if (spriteGroup) {
			scene.add(spriteGroup);
		}

		const handleMouseMove = (event: MouseEvent) => {
			if (!renderer?.domElement || !camera || !spriteGroup || !raycaster || !mouse) return;

			const rect = renderer.domElement.getBoundingClientRect();
			mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(spriteGroup.children);

			if (intersects.length > 0) {
				const sprite = intersects[0].object as THREE.Sprite;
				if (hoveredSprite !== sprite) {
					if (hoveredSprite && hoveredSprite.material) {
						(hoveredSprite.material as THREE.SpriteMaterial).opacity = 0.9;
					}
					hoveredSprite = sprite;
					if (sprite.material) {
						(sprite.material as THREE.SpriteMaterial).opacity = 1;
						renderer.domElement.style.cursor = 'pointer';
					}
				}
			} else {
				if (hoveredSprite && hoveredSprite.material) {
					(hoveredSprite.material as THREE.SpriteMaterial).opacity = 0.9;
					hoveredSprite = null;
					renderer.domElement.style.cursor = 'default';
				}
			}
		};

		const handleClick = (event: MouseEvent) => {
			if (!renderer?.domElement || !camera || !spriteGroup || !raycaster || !mouse) return;

			const rect = renderer.domElement.getBoundingClientRect();
			mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(spriteGroup.children);

			if (intersects.length > 0) {
				const sprite = intersects[0].object as THREE.Sprite;
				const panelId = sprite.userData.panelId;
				console.log('Hotspot clicked:', panelId, sprite);
				if (panelId && onHotspotClick) {
					onHotspotClick(panelId);
				}
			}
		};

		renderer.domElement.addEventListener('mousemove', handleMouseMove);
		renderer.domElement.addEventListener('click', handleClick);

		cleanupFunctions.push(() => {
			if (renderer?.domElement) {
				renderer.domElement.removeEventListener('mousemove', handleMouseMove);
				renderer.domElement.removeEventListener('click', handleClick);
				renderer.domElement.style.cursor = 'default';
			}
		});

		return () => {
			cleanupFunctions.forEach((fn) => fn());
			cleanupFunctions = [];
		};
	});

	onDestroy(() => {
		if (spriteGroup && scene) {
			spriteGroup.children.forEach((child) => {
				if (child instanceof THREE.Sprite && child.material) {
					child.material.dispose();
					if (child.material.map) {
						child.material.map.dispose();
					}
				}
			});
			scene.remove(spriteGroup);
		}
		if (texture) {
			texture.dispose();
		}
	});
</script>

<!-- Panorama Sphere -->
<T.Mesh bind:object={sphereMesh}>
	<T.SphereGeometry args={[500, 60, 40]} />
	<T.MeshBasicMaterial side={THREE.BackSide}>
		{#if texture}
			<T.Texture use={() => texture} />
		{/if}
	</T.MeshBasicMaterial>
	<T.Transform scale={[-1, 1, 1]} />
</T.Mesh>
