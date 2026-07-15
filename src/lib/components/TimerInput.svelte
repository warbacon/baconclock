<script lang="ts">
	import cn from 'cnfast';

	let { value = $bindable('00:00:00'), class: className = '' }: { value?: string; class?: string } =
		$props();

	const MAX = [23, 59, 59];
	const LABELS = ['Hours', 'Minutes', 'Seconds'];

	function parseValue(v: string): number[] {
		const [h, m, s] = v.split(':').map(Number);
		return [h || 0, m || 0, s || 0];
	}
	function pad(n: number): string {
		return n.toString().padStart(2, '0');
	}
	function clamp(n: number, i: number): number {
		return Math.min(Math.max(n, 0), MAX[i]);
	}

	let raw = $state(parseValue(value).map(pad));
	let inputs: (HTMLInputElement | null)[] = $state([null, null, null]);

	$effect(() => {
		const parsed = parseValue(value).map(pad);
		parsed.forEach((p, i) => {
			if (p !== raw[i] && document.activeElement !== inputs[i]) {
				raw[i] = p;
			}
		});
	});

	$effect(() => {
		const next = raw.map((r, i) => pad(clamp(parseInt(r || '0', 10), i))).join(':');
		if (next !== value) value = next;
	});

	function focusNext(i: number): void {
		inputs[i + 1]?.focus();
	}
	function focusPrev(i: number): void {
		inputs[i - 1]?.focus();
	}

	function handleInput(i: number): void {
		raw[i] = raw[i].replace(/\D/g, '').slice(0, 2);

		if (raw[i] != '') {
			raw[i] = clamp(parseInt(raw[i]), i).toString();
		}
	}

	function handleBlur(i: number): void {
		raw[i] = pad(clamp(parseInt(raw[i] || '0', 10), i));
	}

	function handleKeydown(i: number, e: KeyboardEvent): void {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			raw[i] = pad((clamp(parseInt(raw[i] || '0', 10), i) + 1) % (MAX[i] + 1));
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			raw[i] = pad((clamp(parseInt(raw[i] || '0', 10), i) - 1 + MAX[i] + 1) % (MAX[i] + 1));
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			focusNext(i);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			focusPrev(i);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			(e.currentTarget as HTMLInputElement).blur();
		} else if (e.key === 'Backspace' && (e.currentTarget as HTMLInputElement).value === '') {
			e.preventDefault();
			focusPrev(i);
		} else if (!/[0-9]/.test(e.key) && !['Tab', 'Backspace', 'Delete'].includes(e.key)) {
			e.preventDefault();
		}
	}

	function handleFocus(e: FocusEvent): void {
		(e.currentTarget as HTMLInputElement).select();
	}
</script>

<div
	class={cn(
		'flex border-b-2 border-zinc-400 tabular-nums focus-within:border-orange-600 dark:border-zinc-700 dark:focus-within:border-teal-300',
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
			onfocus={handleFocus}
			onblur={() => handleBlur(i)}
			class="w-[2ch] text-center outline-none"
		/>
	{/each}
</div>
