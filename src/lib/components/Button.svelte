<script lang="ts">
	interface Props {
		content?: string;
		func: () => void;
	}

	let { content = 'Botón', func }: Props = $props();
</script>

<button onclick={func}>{content}</button>

<style>
	button {
		background-color: var(--rp-main-overlay);
		outline: transparent;
		border: transparent;
		font-family: inherit;
		font-size: 1.1rem;
		padding: 0.75rem 2rem;
		border-radius: 50px;
		transition: background-color 250ms;
		cursor: pointer;
		&:hover {
			background-color: var(--rp-main-highlight-med);
		}
		@media (max-width: 512px) {
			font-size: 1rem;
		}
	}
</style>
