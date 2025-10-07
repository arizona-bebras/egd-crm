<script lang="ts">
    import { Dot } from '@lucide/svelte';
    let { title, startTime, endTime, venue} = $props()
    let starthours = new Date(startTime)
</script>
<div class="flex flex-col h-[90px] bg-accent rounded-2xl p-[16px]">
    <div class="text-xl font-bold">{title}</div>
    <div class="flex-row justify-between w-80">
        <p class="text-xl font-medium">{startTime} - {endTime}</p>
        <Dot />
        <p class="text-xl font-medium">{venue}</p>
    </div>
</div>