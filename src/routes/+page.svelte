<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let date = new Date();
	let seconds: string = '00';
	let minutes: string = '00';
	let hours: string = '00';
	let timeInterval: number;

	onMount(() => {
		timeInterval = setInterval(() => {
			date = new Date();
		}, 250);
	});
	onDestroy(() => clearInterval(timeInterval));

	$: {
		seconds = String(date.getSeconds()).padStart(2, '0');
		minutes = String(date.getMinutes()).padStart(2, '0');
		hours = String(date.getHours());
	}
</script>

<h1>{hours}:{minutes}:{seconds}</h1>
