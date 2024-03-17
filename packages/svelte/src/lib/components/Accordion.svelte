<script lang="ts">
	import { cn } from '$lib/cn';
	import H2 from './H2.svelte';

	// Props
	export let title: string;
	export let id: string;

	// Locals
	const _panelId = id + '-panel';

	// State
	let _expanded = false;

	function onClick() {
		_expanded = !_expanded;
	}
</script>

<article class="border-4 border-orange-100 dark:border-blue-950">
	<H2 class="mb-0">
		<button
			type="button"
			aria-expanded={_expanded}
			class={cn(
				'flex w-full justify-between items-center p-4  bg-orange-100 dark:bg-blue-950 transition-colors hover:bg-orange-50 dark:hover:bg-blue-900',
				{
					'bg-orange-50 dark:bg-blue-900': _expanded
				}
			)}
			aria-controls={_panelId}
			{id}
			on:click={onClick}
		>
			<span class="accordion-title">
				{title}
			</span>
			<span class="transition-all" class:rotate-45={_expanded}
				><svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect y="7.5" width="16" height="2" fill="currentColor" />
					<rect
						x="9"
						y="0.5"
						width="16"
						height="2"
						transform="rotate(90 9 0.5)"
						fill="currentColor"
					/>
				</svg>
			</span>
		</button>
	</H2>
	<div
		id={_panelId}
		role="region"
		aria-labelledby={id}
		class="transition-all p-4 pt-0"
		class:hidden={!_expanded}
	>
		<slot />
	</div>
</article>
