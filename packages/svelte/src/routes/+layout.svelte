<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initPosthogCsr } from '$lib/posthog';

	export let data;

	onMount(initPosthogCsr);
</script>

<nav>
	{#each data.navigation as { path, title }}
		<a href={path}>{title}</a>
	{/each}
</nav>

<slot />
