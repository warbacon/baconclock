<script lang="ts">
	import Button from '../../lib/components/Button.svelte';
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

<svelte:head>
	<title>{currentTime} - Timer</title>
</svelte:head>

<article>
	{#if !timerInterval && currentTime == '00:00:00'}
		<input
			class="bg-rp-dawn-base font-clock dark:bg-rp-base border-b-rp-dawn-highlight-med dark:border-b-rp-highlight-med focus:border-b-rp-dawn-gold focus:dark:border-b-rp-gold border-0 border-b-1 text-center font-bold focus:ring-0"
			type="time"
			aria-label="time"
			step="1"
			bind:value={time}
			min="00:00:00"
			max="23:59:59"
		/>
		{#if time != '00:00:00'}
			<div class="absolute bottom-20 left-0 flex w-full justify-center gap-4">
				<Button func={toggleTimer} content={toggleButton} />
				<Button func={resetTimer} content={resetButton} />
			</div>
		{/if}
	{:else}
		<h1 class="font-clock text-center font-bold">{currentTime}</h1>
		<div class="absolute bottom-20 left-0 flex w-full justify-center gap-4">
			<Button func={toggleTimer} content={toggleButton} />
			<Button func={resetTimer} content={resetButton} />
		</div>
	{/if}
</article>
