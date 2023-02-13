<script lang="ts">
	export let content = 'Botón';
	export let func: () => void;
</script>

<button on:click={func}>{content}</button>

<style lang="postcss">
	button {
		color: #c4c7c5;
		background-color: #2d2f31;
		outline: transparent;
		border: transparent;
		font-size: 1.1rem;
		padding: 0.75rem 2rem;
		border-radius: 50px;
		transition: background-color 250ms;
		&:hover {
			background-color: #383b3c;
			cursor: pointer;
		}
	}
</style>
