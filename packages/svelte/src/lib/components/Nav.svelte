<script lang="ts">
	import Hamburger from '$lib/components/Hamburger.svelte';
	import Cross from '$lib/components/Cross.svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';

	const _ANIMATION_DURATION = 200;
	let isMobileNavVisible = false;
	function _handleButtonClick() {
		isMobileNavVisible = !isMobileNavVisible;
	}

	export let links: Array<{
		path: string;
		title: string;
	}>;
</script>

<svelte:body class:mobile-nav-expanded={isMobileNavVisible} />

<nav class="hidden md:flex text-lg gap-3" id="main-nav">
	{#each links as { path, title }}
		<a
			class:underline={$page.url.pathname === path}
			aria-current={$page.url.pathname === path}
			href={path}>{title}</a
		>
	{/each}
</nav>

{#if !isMobileNavVisible}
	<button
		class="md:hidden p-4"
		aria-expanded={isMobileNavVisible}
		aria-controls="mobile-nav"
		on:click={_handleButtonClick}
		out:slide={{ axis: 'x', duration: _ANIMATION_DURATION }}
		in:slide={{ axis: 'x', duration: _ANIMATION_DURATION, delay: _ANIMATION_DURATION }}
	>
		<Hamburger />
	</button>
{/if}

{#if isMobileNavVisible}
	<div
		class="bg-orange-100 dark:bg-blue-900 shadow-2xl fixed top-0 right-0 h-screen w-80 flex flex-col p-4 items-end"
		id="mobile-nav"
		in:slide={{ axis: 'x', duration: _ANIMATION_DURATION }}
		out:slide={{ axis: 'x', duration: _ANIMATION_DURATION }}
	>
		<button
			aria-expanded={isMobileNavVisible}
			aria-controls="mobile-nav"
			class="p-4"
			on:click={_handleButtonClick}
			out:slide={{ axis: 'x', duration: _ANIMATION_DURATION }}
		>
			<Cross />
		</button>
		<nav class="grow flex flex-col items-end justify-center text-3xl gap-3">
			{#each links as { path, title }}
				<a
					href={path}
					class:underline={$page.url.pathname === path}
					aria-current={$page.url.pathname === path}>{title}</a
				>
			{/each}
		</nav>
	</div>
{/if}
