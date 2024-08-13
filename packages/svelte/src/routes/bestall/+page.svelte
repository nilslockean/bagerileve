<script lang="ts">
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<Section>
	<H1>Beställ dina fredagsmunkar nu!</H1>
	<div class="p-4 border-4 border-current">
		<H2 class="text-2xl">Gör såhär:</H2>

		<ol>
			<li>Gå till online-beställningen (länk nedan men läs klart detta först).</li>
			<li>Skapa ett konto med Facebook eller din email och logga in.</li>
			<li>Tryck längst upp på startsidan där det står ”Tryck här för att beställa…”.</li>
			<li>Välj antal munkar du önskar förbeställa.</li>
			<li>Avsluta beställningen genom att betala med Swish.</li>
			<li>Du kommer nu få ett bekräftelsemail från True App med ditt ordernummer.</li>
			<li>Klart!</li>
		</ol>

		<p>
			Sen behöver du bara komma på fredagen den tid du valt att hämta dina munkar och säga ditt
			ordernummer. Ifall du vill handla något annat på plats går det självklart också bra!
		</p>
	</div>
	<ButtonLink
		variant="primary"
		href="https://web.trueapp.se/bagerileve/store1/"
		target="_blank"
		rel="noreferrer"
	>
		Till online-beställningen
	</ButtonLink>
</Section>

<Section>
	<H2>Kunde du inte boka?</H2>
	<p>Om det inte fungerar att boka genom vår hemsida, följ den här listan:</p>
	<ol class="mt-4">
		<li>Stäng ner Instagram och webbläsaren du använder.</li>
		<li>
			<a href="https://rensacache.nu/" target="_blank" rel="noreferrer">Rensa cacheminnet</a> på telefonen/datorn
			du använder alternativt byt till en annan webbläsare på samma enhet.
		</li>
		<li>Prova igen.</li>
	</ol>
	<p>Funkar inte det - prova att använda dator istället för mobil eller vice versa!</p>
</Section>

<Section>
	<H2>När kan jag boka?</H2>
	<p>
		Denna bokningssida ligger uppe från 8.00 på torsdagar fram till fullbokat. Är det inte fullbokat
		stänger bokningen kl 18.00 på torsdagen automatiskt.
	</p>
</Section>

<Section>
	<H2>Jag hann inte boka!</H2>
	<p>
		Utöver bokningar släpper vi munkar till butiken också, vid kl 11.00 när vi öppnar och kl 16.00
		när eftermiddagsbrödet kommer ut ur ugnarna. För dessa munkar gäller först till kvarn. Det går
		endast att boka under torsdagen (se ovan).
	</p>
</Section>

<Section>
	<H2>Jag blir sen - kan jag ändå hämta mina munkar?</H2>
	<p>
		Ifall du blir försenad att hämta din beställning - ingen fara! Dina packade munkar finns kvar
		till stängning kl 18.00 på fredagen.
	</p>
</Section>

<Section>
	<H2>Övriga villkor</H2>
	<p class="mb-4">
		<strong>Ej upphämtade munkar återbetalas ej.</strong> Ifall du har bokat munkar men inte kan komma
		till exempel pga sjukdom kan du kontakta oss och göra en retur - detta är möjligt fram till senast
		kl 11.00 på fredagen, därefter återbetalas munkarna ej.
	</p>
	<p>Vi ses!</p>
</Section>

<style lang="postcss">
	ol {
		@apply list-decimal list-inside;
	}

	li {
		@apply mb-4;
	}
</style>
