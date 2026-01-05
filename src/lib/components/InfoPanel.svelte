<script lang="ts">
	import type { InfoPanel as InfoPanelType } from '../data/functional-effects-data';

	interface Props {
		panel: InfoPanelType;
		visible: boolean;
		onClose: () => void;
		onNavigate: (target: string) => void;
	}

	let { panel, visible, onClose, onNavigate }: Props = $props();
</script>

<div class="info-panel {panel.type}" class:visible id={panel.id} rel={panel.id}>
	<div class="photo-wrapper">
		<img loading="lazy" src={panel.photo} alt={panel.title} />
	</div>
	<div class="content-wrapper">
		<div class="back-to-panolens close-icon" on:click={onClose}>
			<img width="16" src="/src/lib/assets/icons/closeX.svg" alt="Close" />
		</div>
		<div class="upper-content">
			<h2>{panel.title}</h2>
			<p>
				{panel.description} <em>{panel.citation}</em>
			</p>
			{#if panel.type === 'animal' && panel.behaviors}
				<h3>Affected Animal Behavior:</h3>
				<ul>
					<li class="icon-mating" class:active={panel.behaviors.mating}>
						<img loading="lazy" src="/src/lib/assets/icons/icon-mating.svg" alt="" />
						Mating
					</li>
					<li class="icon-habitat-patterns" class:active={panel.behaviors.habitatPatterns}>
						<img loading="lazy" src="/src/lib/assets/icons/icon-habitat-pattern.svg" alt="" />
						Habitat Patterns
					</li>
					<li class="icon-hunting" class:active={panel.behaviors.hunting}>
						<img loading="lazy" src="/src/lib/assets/icons/icon-hunting.svg" alt="" />
						Hunting
					</li>
					<li class="icon-predator-avoidance" class:active={panel.behaviors.predatorAvoidance}>
						<img loading="lazy" src="/src/lib/assets/icons/icon-predatory-avoidance.svg" alt="" />
						Predator Avoidance
					</li>
				</ul>
			{:else if panel.type === 'human' && panel.effects}
				<ul class="humans">
					<li class="icon-benefit" class:active={panel.effects.benefit}>
						<img loading="lazy" src="/src/lib/assets/icons/icon-benefit.svg" alt="" />
						Benefit
					</li>
					<li class="icon-negative" class:active={panel.effects.negative}>
						<img loading="lazy" src="/src/lib/assets/icons/icon-negative.svg" alt="" />
						Negative Effect
					</li>
				</ul>
			{/if}
		</div>
		<div class="lower-content">
			<div class="third back back-to-panolens">
				<button class="btn-pano-close" on:click={onClose}>
					<img loading="lazy" src="/src/lib/assets/icons/back-360.svg" alt="" />
					Back to 360° <br />Experience
				</button>
			</div>
			{#if panel.prevTarget && panel.prevImage}
				<div class="third">
					<button class="progress-button" on:click={() => onNavigate(panel.prevTarget!)}>
						<div class="control">
							<img loading="lazy" src="/src/lib/assets/icons/arrow-left.svg" alt="" />
						</div>
						<div class="img">
							<img loading="lazy" src={panel.prevImage} alt="" />
						</div>
					</button>
				</div>
			{/if}
			{#if panel.nextTarget && panel.nextImage}
				<div class="third">
					<button class="progress-button" on:click={() => onNavigate(panel.nextTarget!)}>
						<div class="control">
							<img loading="lazy" src="/src/lib/assets/icons/arrow-right.svg" alt="" />
						</div>
						<div class="img">
							<img loading="lazy" src={panel.nextImage} alt="" />
						</div>
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Info panel visibility is handled by global CSS */
	.info-panel {
		display: none;
	}

	.info-panel.visible {
		display: block;
	}
</style>

