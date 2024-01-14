<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initPosthogCsr } from '$lib/posthog';
	import Nav from '$lib/components/Nav.svelte';
	import Logo from '$lib/components/Logo.svelte';

	export let data;

	onMount(initPosthogCsr);
</script>

<header
	class="p-4 flex items-center justify-between gap-4 flex-wrap max-w-screen-2xl mx-auto 2xl:py-6"
>
	<a href="/">
		<Logo />
	</a>

	<Nav links={data.navigation} />
</header>

<slot />
