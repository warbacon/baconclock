<script lang="ts">
	import { onMount } from 'svelte';

	let date = $state(new Date());

	const hours = $derived(date.getHours().toString().padStart(2, '0'));
	const minutes = $derived(date.getMinutes().toString().padStart(2, '0'));
	const seconds = $derived(date.getSeconds().toString().padStart(2, '0'));

	let timeout: number;

	function tick() {
		const now = new Date();
		date = now;
		timeout = window.setTimeout(tick, 1000 - now.getMilliseconds());
	}

	onMount(() => {
		tick();
		return () => clearTimeout(timeout);
	});
</script>

<svelte:head>
	<title>Clock | Baconclock</title>
	<link rel="canonical" href="https://baconclock.vercel.app/clock" />
	<meta
		name="description"
		content="Ad-Free online clock with live time display. Accurate, fast, and beautiful digital clock. No ads, no tracking, works offline."
	/>
</svelte:head>

<h1 class="font-clock">{hours}:{minutes}:{seconds}</h1>
