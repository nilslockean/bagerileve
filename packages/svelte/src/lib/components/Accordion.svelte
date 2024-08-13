<script lang="ts">
	import { cn } from '$lib/cn';
	import Plus from '$lib/icons/Plus.svelte';
	import H3 from './H3.svelte';

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

<article
	{...$$restProps}
	class={cn('border-4 border-orange-100 dark:border-blue-950', $$restProps.class)}
>
	<H3 class="mb-0 text-2xl">
		<button
			type="button"
			aria-expanded={_expanded}
			class={cn(
				'flex w-full justify-between gap-4 items-baseline p-4 bg-orange-100 dark:bg-blue-950 transition-colors hover:bg-orange-50 dark:hover:bg-blue-900',
				{
					'bg-orange-50 dark:bg-blue-900': _expanded
				}
			)}
			aria-controls={_panelId}
			{id}
			on:click={onClick}
		>
			<span class="accordion-title text-left">
				{title}
			</span>
			<span class="transition-all" class:rotate-45={_expanded}><Plus /> </span>
		</button>
	</H3>
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
