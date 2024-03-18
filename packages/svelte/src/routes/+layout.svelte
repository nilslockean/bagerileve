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
	import { LogoSize } from '$lib/enums/LogoSize';
	import { page } from '$app/stores';
	import config from '../config';
	import H4 from '$lib/components/H4.svelte';
	import { env } from '$env/dynamic/public';

	// Find the current navigation item in config
	$: currentNavItem = config.navigation.find((item) => item.path === $page.url.pathname);

	// Initialize PostHog
	onMount(initPosthogCsr);

	export let data;
</script>

<svelte:head>
	<title>{$page.data.title ?? `${currentNavItem?.title} • ${config.siteTitle}`}</title>
	<meta name="description" content={$page.data.metaDescription} />
	<!-- <meta name="robots" content="noindex,follow" /> -->
	<meta name="robots" content={env.PUBLIC_META_ROBOTS_CONTENT} />
</svelte:head>

<header class="p-6 flex items-center justify-between gap-6 max-w-screen-2xl mx-auto">
	<a href="/">
		<Logo />
	</a>

	<Nav links={data.navigation} />
</header>

<main>
	<slot />
</main>

<footer class="bg-blue-900 dark:bg-blue-950 text-orange-50 px-6 py-8 sticky top-[100vh]">
	<div class="grid gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-16 xl:grid-cols-4 xl:gap-x-16">
		<div>
			<Logo size={LogoSize.SMALL} />
		</div>
		<div>
			<OpeningHours data={data.openingHours} />
		</div>
		<div>
			<H4 class="mb-4">Meny</H4>
			<nav class="flex flex-col gap-2 mb-4">
				<NavLinks links={data.navigation} />
			</nav>
		</div>
		<div>
			<H4 class="mb-4">{config.siteTitle}</H4>
			<p>
				Östra Rönneholmsvägen 6<br />
				211 47 Malmö
			</p>
			<p>Hitta hit</p>
		</div>
	</div>
	<Hr className="my-8" />
	<nav class="flex gap-3">
		{#each data.colophonNavigation as { path, title }}
			<Link href={path}>{title}</Link>
		{/each}
	</nav>
</footer>
