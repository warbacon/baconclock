<script lang="ts">
	import cn from 'cnfast';

	let { value = $bindable('00:00:00'), class: className = '' }: { value?: string; class?: string } =
		$props();

	const MAX = [23, 59, 59];
	const LABELS = ['Hours', 'Minutes', 'Seconds'];

	let raw = $state(value.split(':').map((v) => (v || '0').slice(0, 2).padStart(2, '0')));
	let inputs: (HTMLInputElement | null)[] = $state([null, null, null]);
	let focusedIndex = $state(-1);

	$effect(() => {
		if (focusedIndex >= 0) return;
		const parts = value.split(':');
		for (let i = 0; i < 3; i++) {
			raw[i] = (parts[i] || '0').slice(0, 2).padStart(2, '0');
		}
	});

	$effect(() => {
		const next = raw
			.map((r, i) => {
				const num = parseInt(r, 10) || 0;
				return Math.min(Math.max(num, 0), MAX[i]).toString().padStart(2, '0');
			})
			.join(':');
		if (next !== value) value = next;
	});

	function handleInput(i: number) {
		raw[i] = raw[i].replace(/\D/g, '').slice(0, 2);

		if (raw[i].length === 2 && i < 2) {
			inputs[i + 1]?.focus();
		}
	}

	function handleFocus(i: number, e: FocusEvent) {
		focusedIndex = i;
		(e.currentTarget as HTMLInputElement).select();
	}

	function handleBlur(i: number) {
		focusedIndex = -1;
		const num = parseInt(raw[i], 10) || 0;
		raw[i] = Math.min(Math.max(num, 0), MAX[i]).toString().padStart(2, '0');
	}

	function handleKeydown(i: number, e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			const num = parseInt(raw[i], 10) || 0;
			raw[i] = ((num + 1) % (MAX[i] + 1)).toString().padStart(2, '0');
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			const num = parseInt(raw[i], 10) || 0;
			raw[i] = ((num - 1 + MAX[i] + 1) % (MAX[i] + 1)).toString().padStart(2, '0');
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			inputs[i + 1]?.focus();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			inputs[i - 1]?.focus();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			(e.currentTarget as HTMLInputElement).blur();
		} else if (e.key === 'Backspace' && (e.currentTarget as HTMLInputElement).value === '') {
			e.preventDefault();
			inputs[i - 1]?.focus();
		} else if (!/[0-9]/.test(e.key) && !['Tab', 'Backspace', 'Delete'].includes(e.key)) {
			e.preventDefault();
		}
	}
</script>

<div
	class={cn(
		'flex border-b-2 border-zinc-400 tabular-nums focus-within:border-orange-700 dark:border-zinc-700 dark:focus-within:border-teal-300',
		className
	)}
>
	{#each raw, i}
		{#if i > 0}<span class="select-none">:</span>{/if}
		<input
			bind:value={raw[i]}
			bind:this={inputs[i]}
			inputmode="numeric"
			type="text"
			maxlength="2"
			aria-label={LABELS[i]}
			oninput={() => handleInput(i)}
			onkeydown={(e) => handleKeydown(i, e)}
			onfocus={(e) => handleFocus(i, e)}
			onblur={() => handleBlur(i)}
			class="w-[2ch] text-center outline-none"
		/>
	{/each}
</div>
