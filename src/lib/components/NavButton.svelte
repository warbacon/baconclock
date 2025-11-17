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
		`${
			isActive
				? 'hover:text-rp-dawn-text hover:dark:text-rp-surface text-rp-dawn-text dark:text-rp-surface bg-rp-gold hover:bg-rp-gold dark:bg-rp-gold hover:dark:bg-rp-gold font-bold'
				: 'text-rp-dawn-muted dark:text-rp-muted hover:bg-rp-dawn-overlay hover:dark:bg-rp-overlay'
		}
	inline-flex items-center justify-center gap-2 transition-[font-weight,scale]`,
		className
	)}
	{href}
	{...props}
>
	{@render children?.()}
</Button>
