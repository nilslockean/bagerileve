<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initPosthogCsr } from '$lib/posthog';
	import Nav from '$lib/components/Nav.svelte';
	import NavLinks from '$lib/components/NavLinks.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import OpeningHours from '$lib/components/OpeningHours.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Link from '$lib/components/Link.svelte';

	export let data;

	onMount(initPosthogCsr);
</script>

<header class="p-6 flex items-center justify-between gap-4 flex-wrap max-w-screen-2xl mx-auto">
	<a href="/">
		<Logo />
	</a>

	<Nav links={data.navigation} />
</header>

<main>
	<slot />
</main>

<footer class="bg-blue-900 dark:bg-blue-950 text-orange-50 p-6 sticky top-[100vh]">
	<div class="grid gap-3">
		<Logo />
		<OpeningHours />
		<div>
			<h4 class="uppercase text-lg mb-4">Meny</h4>
			<nav class="flex flex-col gap-2 mb-4">
				<NavLinks links={data.navigation} />
			</nav>
		</div>
		<div>
			<h4 class="uppercase text-lg mb-4">Bageri Leve</h4>
			<p>
				Östra Rönneholmsvägen 6<br />
				211 47 Malmö
			</p>
			<p>Hitta hit</p>
		</div>
	</div>
	<Hr className="my-8" />
	<Link href="/integritetspolicy">Integritetspolicy</Link>
	&bull;
	<Link href="/bokningsvillkor">Bokningsvillkor</Link>
</footer>
