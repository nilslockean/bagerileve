<script lang="ts">
	import { cn } from '$lib/cn';
</script>

<p {...$$restProps} class={cn('mb-4 last:mb-0', $$restProps.class)}>
	<slot />
</p>
