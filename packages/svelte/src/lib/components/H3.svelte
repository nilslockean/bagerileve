<script lang="ts">
	import { cn } from '$lib/cn';
</script>

<h3 {...$$restProps} class={cn('text-3xl tracking-wider', $$restProps.class)}>
	<slot />
</h3>
