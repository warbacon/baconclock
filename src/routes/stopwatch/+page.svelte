<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { formatTime, createKeyboardHandler } from '$lib/utils';

	let elapsed = $state(0);
	let isRunning = $state(false);

	const time = $derived(formatTime(elapsed));

	beforeNavigate(({ cancel }) => {
		if (
			isRunning &&
			!confirm('Are you sure you want to leave this page? The stopwatch will be stopped.')
		) {
			cancel();
		}
	});

	$effect(() => {
		return createKeyboardHandler({
			onToggle: toggleStopwatch,
			onReset: resetStopwatch
		});
	});

	$effect(() => {
		if (!isRunning) return;

		const startTime = Date.now() - elapsed * 1000;
		const id = window.setInterval(() => {
			elapsed = Math.floor((Date.now() - startTime) / 1000);
		}, 1000);

		return () => clearInterval(id);
	});

	function toggleStopwatch() {
		isRunning = !isRunning;
	}

	function resetStopwatch() {
		isRunning = false;
		elapsed = 0;
	}
</script>

<svelte:head>
	<title>
		{`${isRunning ? `${time} - ` : ''}Stopwatch | Baconclock`}
	</title>

	<link rel="canonical" href="https://baconclock.vercel.app/stopwatch" />

	<meta
		name="description"
		content="Free online stopwatch with start, stop, and reset functionality. Precision timing for sports, cooking, workouts, and more. Keyboard shortcuts supported."
	/>
</svelte:head>

<article>
	<h1 class="font-clock">{time}</h1>
	<div class="absolute bottom-[25dvh] left-0 flex w-full justify-center gap-4">
		<Button onclick={toggleStopwatch}>
			{isRunning ? 'Stop' : elapsed > 0 ? 'Continue' : 'Start'}
		</Button>
		{#if isRunning || elapsed > 0}
			<Button onclick={resetStopwatch}>Reset</Button>
		{/if}
	</div>
</article>
