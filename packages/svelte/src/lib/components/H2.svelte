<script lang="ts">
	import { cn } from '$lib/cn';
</script>

<h2 {...$$restProps} class={cn('text-4xl mb-2', $$restProps.class)}>
	<slot />
</h2>
