<script lang="ts">
	import Button from '../../components/Button.svelte';
	import { onMount, onDestroy } from 'svelte';

	let title: string;
	let chronoInterval: any = false;
	let chronoButton = 'Start';
	let time = '00:00:00';
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	$: if (!chronoInterval) {
		title = 'Stopwatch';
	} else {
		title = time;
	}

	onMount(() => {
		document.onkeyup = (e) => {
			if (e.key == ' ' || e.key == 'p') startStop();
			if (e.key == 'r') resetChronometer();
		};
	});

	onDestroy(() => stopChronometer());

	const startStop = () => {
		if (chronoInterval) {
			stopChronometer();
			if (time == '00:00:00') chronoButton = 'Start';
			else chronoButton = 'Continue';
		} else {
			startChronometer();
			chronoButton = 'Stop';
		}
	};

	const startChronometer = () => (chronoInterval = setInterval(chronometer, 1000));

	const stopChronometer = () => {
		clearInterval(chronoInterval);
		chronoInterval = false;
	};

	const resetChronometer = () => {
		if (chronoInterval) stopChronometer();
		chronoButton = 'Start';
		time = '00:00:00';
		hours = 0;
		minutes = 0;
		seconds = 0;
	};

	const chronometer = () => {
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
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{time}</h1>
{#if !chronoInterval && time == '00:00:00'}
	<Button func={startStop} content={chronoButton} />
{:else}
	<div>
		<Button func={startStop} content={chronoButton} />
		<Button func={resetChronometer} content={'Reset'} />
	</div>
{/if}

<style lang="postcss">
	div {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
</style>
