<script lang="ts">
    import { Dot } from '@lucide/svelte';
    let { title, startTime, endTime, venue} = $props()
    let startHours = new Date(startTime).getHours()
    let endHours = new Date(endTime).getHours()
</script>
<div class="flex flex-col text-[#DEDEDE] bg-accent rounded-2xl p-[16px]">
    <div class="text-xl font-bold">{title}</div>
    <div class="flex flex-row items-center justify-left max-w-80">
        <p class="text-xl font-medium">{startHours} - {endHours}</p>
        <Dot class="w-10 h-10" />
        <p class="text-xl font-medium">{venue}</p>
    </div>
</div>