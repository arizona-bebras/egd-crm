<script>
    import Day from "./day.svelte";
	let schedule = [0,0,0,0]
</script>
{#each schedule as day}
    <Day date="2025-11-05" />
{/each}