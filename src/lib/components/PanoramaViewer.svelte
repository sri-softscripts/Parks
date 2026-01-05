<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { T } from '@threlte/core';
	import PanoramaContent from './PanoramaContent.svelte';
	import type { Hotspot as HotspotType } from '../data/functional-effects-data';

	interface Props {
		panoramaImage: string;
		hotspots: HotspotType[];
		onHotspotClick: (panelId: string) => void;
		active?: boolean;
	}

	let { panoramaImage, hotspots, onHotspotClick, active = true }: Props = $props();
</script>

<div class="pano-container" class:active>
	<Canvas
		camera={{ fov: 70, position: [1500, -1000, -1000] }}
		gl={{ antialias: true, alpha: true }}
		class="panorama-canvas"
	>
		<PanoramaContent {panoramaImage} {hotspots} {onHotspotClick} />
		<T.PerspectiveCamera makeDefault fov={70} position={[1500, -1000, -1000]} />
		<OrbitControls
			enableZoom={false}
			enablePan={false}
			autoRotate={false}
			enableDamping={true}
			dampingFactor={0.05}
		/>
		<T.AmbientLight intensity={0.5} />
		<T.PointLight color={0xffffbb} intensity={0.9} />
	</Canvas>
</div>

<style>
	.pano-container {
		width: 100%;
		height: 100%;
		position: relative;
		background-color: rgb(0, 0, 0);
		display: block;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}

	.pano-container.active {
		opacity: 1;
		pointer-events: all;
	}

	:global(.panorama-canvas) {
		width: 100%;
		height: 100%;
	}
</style>
