<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';

	let toggleButton = $state('Start');
	let resetButton = 'Reset';
	let time = $state('00:00:00');
	let currentTime: string = $state('00:00:00');
	let timerInterval: number = $state(0);
	let hours: number = $state(0);
	let minutes: number = $state(0);
	let seconds: number = $state(0);

	onMount(() => {
		document.onkeyup = (e: KeyboardEvent) => {
			if (e.key == ' ' || e.key == 'p') toggleTimer();
			if (e.key == 'r') resetTimer();
		};
	});

	onDestroy(() => clearInterval(timerInterval));

	function toggleTimer() {
		if (timerInterval) {
			stopTimer();
			toggleButton = currentTime != '00:00:00' ? 'Continue' : 'Start';
		} else {
			if (time != '00:00:00') {
				startTimer();
				toggleButton = 'Stop';
			}
		}
	}

	function resetTimer() {
		stopTimer();
		hours = 0;
		minutes = 0;
		seconds = 0;
		toggleButton = 'Start';
	}

	function startTimer() {
		if (time != '00:00:00') {
			if (currentTime == '00:00:00') {
				hours = parseInt(time.substring(0, 2));
				minutes = parseInt(time.substring(3, 5));
				seconds = parseInt(time.substring(6));
			}
			timerInterval = setInterval(timer, 1000);
		}
	}

	function stopTimer() {
		clearInterval(timerInterval);
		timerInterval = 0;
	}

	function timer() {
		if (currentTime == '00:00:00') {
			resetTimer();
		} else {
			seconds--;
			if (seconds <= -1) {
				seconds = 59;
				minutes--;
				if (minutes <= -1) {
					minutes = 59;
					hours--;
				}
				if (hours <= -1) {
					minutes = 59;
					hours = 0;
				}
			}
		}
	}

	$effect(() => {
		if (time == '' || time == '00:00') time = '00:00:00';
		currentTime =
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
	});
</script>

{#if !timerInterval && currentTime == '00:00:00'}
	<input type="time" aria-label="time" step="1" bind:value={time} min="00:00:00" max="23:59:59" />
	{#if time != '00:00:00'}
		<div>
			<Button func={toggleTimer} content={toggleButton} />
		</div>
	{/if}
{:else}
	<h1>{currentTime}</h1>
	<div>
		<Button func={toggleTimer} content={toggleButton} />
		<Button func={resetTimer} content={resetButton} />
	</div>
{/if}

<style>
	div {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
	input[type='time'] {
		font-family: inherit;
		font-size: 2em;
		font-weight: 600;
		border: none;
		border-bottom: 2px solid var(--rp-main-highlight-med);
		margin-bottom: 2rem;
		background-color: transparent;
		transition: border-bottom 250ms;
		&:focus {
			outline: transparent;
			border-bottom: 2px solid var(--rp-main-highlight-high);
		}
	}
	input[type='time']::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
