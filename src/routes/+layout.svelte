<script lang="ts">
	import '../app.css';

	import '@fontsource/iosevka-etoile/700.css';
	import '@fontsource-variable/dm-sans';

	import NavButton from '../lib/components/NavButton.svelte';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let { children }: LayoutProps = $props();

	function handleKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;

		if (
			target.closest('input, textarea') ||
			(target.isContentEditable ?? false) ||
			e.ctrlKey ||
			e.altKey
		) {
			return;
		}

		switch (e.key) {
			case '1':
				goto('/clock');
				break;
			case '2':
				goto('/stopwatch');
				break;
			case '3':
				goto('/timer');
				break;
			default:
				return;
		}

		e.preventDefault();
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeydown);
		}
	});
</script>

<div class="bg-rp-dawn-base text-rp-dawn-text dark:bg-rp-base dark:text-rp-text">
	<header class="flex w-screen justify-center">
		<nav
			class="bg-rp-dawn-surface dark:bg-rp-surface fixed top-4 space-x-2 rounded-full p-5 shadow"
		>
			<NavButton href="/clock">Clock</NavButton>
			<NavButton href="/stopwatch">Stopwatch</NavButton>
			<NavButton href="/timer">Timer</NavButton>
		</nav>
	</header>

	<main class="flex h-[100dvh] w-screen flex-col items-center justify-center space-y-4">
		{@render children()}
	</main>
</div>

<style>
	:global(h1, input[type='time']) {
		font-size: clamp(3rem, 16vw, 9rem);
	}
</style>
