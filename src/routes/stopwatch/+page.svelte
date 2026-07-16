<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { onMount, onDestroy } from 'svelte';

	let chronoInterval = $state(0);
	let chronoButton = $state('Start');
	let time = $state('00:00:00');
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	onMount(() => {
		document.onkeyup = (e) => {
			if (e.key == ' ' || e.key == 'p') startStop();
			if (e.key == 'r') resetChronometer();
		};
	});

	onDestroy(() => stopChronometer());

	beforeNavigate(({ cancel }) => {
		if (
			chronoInterval &&
			!confirm('Are you sure you want to leave this page? The stopwatch will be stopped.')
		) {
			cancel();
		}
	});

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
		if (browser) chronoInterval = window.setInterval(chronometer, 1000);
	}

	function stopChronometer() {
		if (browser) window.clearInterval(chronoInterval);
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
	<title>
		{`${browser && chronoInterval ? `${time} - ` : ''}Stopwatch | Baconclock`}
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
		<Button onclick={startStop}>
			{chronoButton}
		</Button>
		{#if chronoInterval || time != '00:00:00'}
			<Button onclick={resetChronometer}>Reset</Button>
		{/if}
	</div>
</article>
