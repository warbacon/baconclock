<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '../../lib/components/Button.svelte';
	import { onMount, onDestroy } from 'svelte';

	let chronoInterval: number = $state(0);
	let chronoButton = $state('Start');
	let time = $state('00:00:00');
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	onMount(() => {
		if (browser) {
			document.onkeyup = (e) => {
				if (e.key == ' ' || e.key == 'p') startStop();
				if (e.key == 'r') resetChronometer();
			};
		}
	});

	onDestroy(() => stopChronometer());

	function startStop() {
		if (chronoInterval) {
			stopChronometer();
			if (time == '00:00:00') chronoButton = 'Start';
			else chronoButton = 'Continue';
		} else {
			startChronometer();
			chronoButton = 'Stop';
		}
	}

	function startChronometer() {
		chronoInterval = setInterval(chronometer, 1000);
	}

	function stopChronometer() {
		clearInterval(chronoInterval);
		chronoInterval = 0;
	}

	function resetChronometer() {
		if (chronoInterval) stopChronometer();
		chronoButton = 'Start';
		time = '00:00:00';
		hours = 0;
		minutes = 0;
		seconds = 0;
	}

	function chronometer() {
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}
		time =
			hours.toLocaleString('es-ES', {
				minimumIntegerDigits: 2
			}) +
			':' +
			minutes.toLocaleString('es-ES', {
				minimumIntegerDigits: 2
			}) +
			':' +
			seconds.toLocaleString('es-ES', {
				minimumIntegerDigits: 2
			});
	}
</script>

<svelte:head>
	<title>{time} - Stopwatch</title>
</svelte:head>

<article>
	<h1 class="font-clock font-bold">{time}</h1>
	<div class="absolute bottom-20 left-0 flex w-full justify-center gap-4">
		{#if !chronoInterval && time == '00:00:00'}
			<Button func={startStop} content={chronoButton} />
		{:else}
			<Button func={startStop} content={chronoButton} />
			<Button func={resetChronometer} content={'Reset'} />
		{/if}
	</div>
</article>
