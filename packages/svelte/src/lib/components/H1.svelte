<script lang="ts">
	import { cn } from '$lib/cn';
</script>

<h1 {...$$restProps} class={cn('text-5xl leading-tight -mx-1 mb-4 xl:text-6xl', $$restProps.class)}>
	<slot />
</h1>
