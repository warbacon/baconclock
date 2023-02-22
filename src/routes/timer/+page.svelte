<script lang="ts">
	import Button from '../../components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';

	let toggleButton = 'Start';
	let resetButton = 'Reset';
	let time = '00:00:00';
	let currentTime: string;
	let timerInterval: any = false;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	onMount(() => {
		document.onkeyup = (e) => {
			if (e.key == ' ' || e.key == 'p') toggleTimer();
			if (e.key == 'r') resetTimer();
		};
	});

	onDestroy(() => clearInterval(timerInterval));

	const toggleTimer = () => {
		if (timerInterval) {
			pauseTimer();
			toggleButton = currentTime != '00:00:00' ? 'Continue' : 'Start'
		} else {
			if (time != '00:00:00') {
				startTimer();
				toggleButton = 'Pause';
			}
		}
	};

	const resetTimer = () => {
		pauseTimer();
		hours = 0;
		minutes = 0;
		seconds = 0;
		toggleButton = 'Start';
	};

	const startTimer = () => {
		if (time != '00:00:00') {
			if (currentTime == '00:00:00') {
				hours = parseInt(time.substring(0, 2));
				minutes = parseInt(time.substring(3, 5));
				seconds = parseInt(time.substring(6));
			}
			timerInterval = setInterval(timer, 1000);
		}
	};

	const pauseTimer = () => {
		clearInterval(timerInterval);
		timerInterval = false;
	};

	const timer = () => {
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
	};

	$: {
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
			console.log(time);
			
	}

	$: if (time == '' || time == '00:00') {
		time = '00:00:00'
	}

</script>

<svelte:head>
	<title>Timer</title>
</svelte:head>

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

<style lang="scss">
	div {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
	input[type='time'] {
		font-family: 'Inter';
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
