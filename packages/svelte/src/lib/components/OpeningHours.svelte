<script lang="ts">
	import type { OpeningHours } from '$lib/schemas/OpeningHoursSchema';
	import H4 from './H4.svelte';
	import H5 from './H5.svelte';

	export let data: OpeningHours;
</script>

<H4>{data.title}</H4>
<div class="@container">
	<table class="table-auto w-full">
		{#each data.hours as row}
			<tr class="@2xl:border-b-2 border-current last:border-none">
				<td class="py-1">{row.day}</td>
				<td class="text-right py-1">{row.time}</td>
			</tr>
		{/each}
	</table>
	{#if data.irregular && data.irregular.length > 0}
		<H5 class="mt-4">Avvikelser</H5>
		<table class="table-auto w-full">
			{#each data.irregular as row}
				<tr class="@2xl:border-b-2 border-current last:border-none">
					<td class="py-1">{row.date}<br /><small class="opacity-75">{row.name}</small></td>
					<td class="text-right py-1 align-baseline">{row.time}</td>
				</tr>
			{/each}
		</table>
	{/if}
</div>
