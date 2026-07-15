<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';
	import TimerInput from '$lib/components/TimerInput.svelte';
	import { onDestroy, onMount } from 'svelte';

	// State
	let time = $state('00:00:00');
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let timerInterval = $state(0);

	// Derived state
	const isRunning = $derived(timerInterval !== 0);
	const isAtZero = $derived(hours === 0 && minutes === 0 && seconds === 0);
	const showInput = $derived(!isRunning && isAtZero);

	const currentTime = $derived(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);

	const toggleButtonText = $derived(isRunning ? 'Stop' : isAtZero ? 'Start' : 'Continue');

	// Lifecycle
	onMount(() => {
		document.onkeyup = (e: KeyboardEvent) => {
			if (e.key === ' ' || e.key === 'p') {
				e.preventDefault();
				toggleTimer();
			}
			if (e.key === 'r') {
				e.preventDefault();
				resetTimer();
			}
		};
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});

	// Utilities
	function pad(num: number): string {
		return num.toLocaleString('es-ES', { minimumIntegerDigits: 2 });
	}

	function parseTimeInput(timeStr: string): void {
		if (!timeStr || timeStr === '00:00') {
			time = '00:00:00';
			return;
		}

		hours = parseInt(timeStr.substring(0, 2));
		minutes = parseInt(timeStr.substring(3, 5));
		seconds = parseInt(timeStr.substring(6));
	}

	function toggleTimer(): void {
		if (isRunning) {
			stopTimer();
		} else {
			startTimer();
		}
	}

	function startTimer(): void {
		if (isAtZero && time !== '00:00:00') {
			parseTimeInput(time);
		}

		if (!isAtZero) {
			timerInterval = setInterval(tick, 1000);
		}
	}

	function stopTimer(): void {
		clearInterval(timerInterval);
		timerInterval = 0;
	}

	function resetTimer(): void {
		stopTimer();
		hours = 0;
		minutes = 0;
		seconds = 0;
		time = '00:00:00';
	}

	function tick(): void {
		if (isAtZero) {
			resetTimer();
			return;
		}

		seconds--;

		if (seconds < 0) {
			seconds = 59;
			minutes--;

			if (minutes < 0) {
				minutes = 59;
				hours--;

				if (hours < 0) {
					hours = 0;
					minutes = 0;
					seconds = 0;
				}
			}
		}
	}

	// Effects
	$effect(() => {
		if (time === '' || time === '00:00') {
			time = '00:00:00';
		}
	});
</script>

<svelte:head>
	<title>{browser ? `${currentTime} - Timer` : 'Timer'}</title>
</svelte:head>

<article>
	{#if showInput}
		<TimerInput class="font-clock font-bold" bind:value={time} />
		{#if time !== '00:00:00'}
			<div class="absolute bottom-[25dvh] left-0 flex w-full justify-center gap-4">
				<Button onclick={toggleTimer}>{toggleButtonText}</Button>
				<Button onclick={resetTimer}>Reset</Button>
			</div>
		{/if}
	{:else}
		<h1 class="font-clock font-bold">{currentTime}</h1>
		<div class="absolute bottom-[25dvh] left-0 flex w-full justify-center gap-4">
			<Button onclick={toggleTimer}>{toggleButtonText}</Button>
			<Button onclick={resetTimer}>Reset</Button>
		</div>
	{/if}
</article>
