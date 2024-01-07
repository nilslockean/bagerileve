<script lang="ts">
	export let data;

	// console.log(data);
</script>

<div>
	<h1>Kurser</h1>
	{#if data.status === 'error'}
		<p>Problem med att hämta kurser:</p>
		<p>{data.message}</p>
	{/if}

	{#if data.status === 'success'}
		{#each data.courses as course}
			<h2>{course.title}</h2>
			<p>{@html course.description}</p>
		{/each}
	{/if}
</div>
