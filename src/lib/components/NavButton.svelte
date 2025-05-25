<script lang="ts">
	let { children, href } = $props();
	import { page } from '$app/state';

	let isActive = $derived(page.url.pathname == href);

	const inactiveStyles =
		'text-rp-dawn-muted dark:text-rp-muted hover:bg-rp-dawn-overlay hover:dark:bg-rp-overlay';
	const activeStyles = 'text-rp-dawn-text dark:text-rp-surface bg-rp-gold dark:bg-rp-gold';
</script>

<a class="{isActive ? activeStyles : inactiveStyles} rounded-full px-4 py-2 font-medium" {href}
	>{@render children()}</a
>
