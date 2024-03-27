<script lang="ts">
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import OpeningHours from '$lib/components/OpeningHours.svelte';
	import Section from '$lib/components/Section.svelte';
	import Link from '$lib/components/Link.svelte';
	import H3 from '$lib/components/H3.svelte';
	import Course from '$lib/components/Course.svelte';

	// Get page and layout data from the server
	export let data;

	const nextCourse = data.courses.status === 'success' ? data.courses.courses[0] : undefined;
</script>

<Section fullwidth class="relative aspect-video flex items-center">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video autoplay muted playsinline loop class="w-full absolute z-10">
		<source
			src="
		https://cdn.sanity.io/files/mz20cm4o/production/9c057df538547c79bedfa2b06e6f276323deecee.mp4"
			type="video/mp4"
		/>
	</video>

	<!-- Color overlay -->
	<div
		class="absolute hidden lg:block inset-0 bg-blue-950 opacity-50 z-20 aspect-video w-full"
	></div>

	<div
		class="z-30 hidden lg:flex flex-col items-start gap-4 p-6 w-full max-w-screen-2xl mx-auto text-orange-50"
	>
		<H1>En nybakad upplevelse mitt i Malmö</H1>
		<p class="text-lg max-w-prose xl:text-xl">
			Surdegsbröd ur ugnen på eftermiddagen och nästan allt är veganskt.
		</p>
		<ButtonLink href="/boka" variant="primary">Beställ fredagsmunk</ButtonLink>
	</div>
</Section>

<Section class="lg:hidden">
	<H1>En nybakad upplevelse mitt i Malmö</H1>
	<p class="text-lg">Surdegsbröd ur ugnen på eftermiddagen och nästan allt är veganskt.</p>
	<ButtonLink href="/boka" variant="primary">Beställ fredagsmunk</ButtonLink>
</Section>

<Section>
	<OpeningHours data={data.openingHours} />
	<ButtonLink href="/kontakt">Hitta hit</ButtonLink>
</Section>

{#if nextCourse}
	<Section>
		<Course course={nextCourse}>
			<p><small>Nästa kurs:</small></p>
		</Course>
		{#if data.courses.status === 'success' && data.courses.courses.length > 1}
			<ButtonLink href="/kurser">Fler kurser</ButtonLink>
		{/if}
	</Section>
{/if}

<Section>
	<behold-widget feed-id="ILmNOqDqv9agGfvK0j7w"></behold-widget>
	<script>
		if ('noModule' in HTMLScriptElement.prototype) {
			const d = document,
				s = d.createElement('script');
			s.type = 'module';
			s.src = 'https://w.behold.so/widget.js';
			d.body.appendChild(s);
		}
	</script>

	<ButtonLink href="https://www.instagram.com/bagerileve" target="_blank" rel="noreferrer"
		>@bagerileve på Instagram</ButtonLink
	>
</Section>

<Section>
	<H2>Bageri Leve</H2>
	<p class="text-lg">
		Ett nytänkande bageri mitt i Malmö. Vi har valt att baka på dagen istället för på natten, att
		baka mycket växtbaserade bakverk istället för att låsa fast oss helt i traditionella
		smörbaserade recept och att baka surdegsbröd som man gjorde förr, innan jästen ens var
		uppfunnen.
	</p>
	<ButtonLink href="/om">Historien om Leve</ButtonLink>
</Section>

<Section fullwidth>
	<img
		class="w-full"
		srcset="https://cdn.sanity.io/images/mz20cm4o/production/3a2c5b5af51eb4101e9af5186dbfab9f510fc1ae-3000x1999.jpg?auto=format&w=1280 1280w, https://cdn.sanity.io/images/mz20cm4o/production/3a2c5b5af51eb4101e9af5186dbfab9f510fc1ae-3000x1999.jpg?auto=format"
		sizes="(max-width: 640px) 1280px, 100vw"
		src="https://cdn.sanity.io/images/mz20cm4o/production/3a2c5b5af51eb4101e9af5186dbfab9f510fc1ae-3000x1999.jpg?auto=format"
		alt="Butikspersonal lägger kanelbullar i en papperspåse"
	/>
</Section>
