<script lang="ts">
	export let content = 'Botón';
	export let func: () => void;
</script>

<button on:click={func}>{content}</button>

<style lang="scss">
	button {
		background-color: var(--rp-main-overlay);
		outline: transparent;
		border: transparent;
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
