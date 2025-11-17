<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/state';
	import type { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/util';

	type Props = ButtonPrimitive.RootProps & {
		href: string;
	};

	let { children, class: className, href, ...props }: Props = $props();

	let isActive = $derived(page.url.pathname == href);
</script>

<Button
	class={cn(
		isActive
			? 'bg-orange-600 text-zinc-200 hover:bg-orange-600 hover:text-zinc-200 dark:bg-teal-300 dark:text-zinc-800 hover:dark:bg-teal-300 hover:dark:text-zinc-800'
			: '' + 'inline-flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-300',
		className
	)}
	{href}
	{...props}
>
	{@render children?.()}
</Button>
