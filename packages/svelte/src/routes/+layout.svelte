<script lang="ts">
	import '../app.css';

	export let data;
</script>

<nav>
	{#each data.navigation as { path, title }}
		<a href={path}>{title}</a>
	{/each}
</nav>

<slot />
