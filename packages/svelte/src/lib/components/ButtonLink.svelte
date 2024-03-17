<script lang="ts">
	import { cn } from '$lib/cn';
	type Variant = 'primary' | 'default';

	export let href: string;
	export let className = '';
	export let variant: Variant = 'default';
</script>

<a
	{href}
	{...$$restProps}
	class={cn(
		'inline-block uppercase font-futura tracking-wider border-4 transition-colors py-4 px-6 mt-4',
		'bg-orange-100 border-orange-100 hover:bg-orange-50 active:border-orange-50 dark:bg-blue-950 dark:border-blue-950 dark:hover:bg-blue-900 dark:active:border-blue-900',

		{
			'border-blue-900 dark:border-orange-100 bg-blue-900 dark:bg-orange-100 hover:bg-blue-800 dark:hover:bg-orange-50  active:border-blue-800 dark:active:border-orange-50  text-orange-50 dark:text-blue-900':
				variant === 'primary'
		},
		className
	)}
>
	<slot />
</a>
