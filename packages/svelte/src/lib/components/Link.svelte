<script lang="ts">
	import { cn } from '$lib/cn';
	import { page } from '$app/stores';

	export let href: string;
	export let className = '';

	$: current = $page.url.pathname === href;
</script>

<a
	{href}
	{...$$restProps}
	aria-current={current}
	class={cn('decoration-2 underline aria-current:no-underline', className)}
>
	<slot />
</a>
