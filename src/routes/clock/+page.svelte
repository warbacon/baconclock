<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let date = $state(new Date());
	let seconds = $derived(String(date.getSeconds()).padStart(2, '0'));
	let minutes = $derived(String(date.getMinutes()).padStart(2, '0'));
	let hours = $derived(String(date.getHours()));
	let timeInterval: number;

	onMount(() => {
		timeInterval = setInterval(() => {
			date = new Date();
		}, 250);
	});
	onDestroy(() => clearInterval(timeInterval));
</script>

<h1 class="font-bold font-clock">{hours}:{minutes}:{seconds}</h1>
