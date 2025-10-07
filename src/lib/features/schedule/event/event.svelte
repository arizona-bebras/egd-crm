<script lang="ts">
    import { Dot } from '@lucide/svelte';
    let { title, startTime, endTime, venue} = $props()
    let startHours = new Date(startTime).getHours()
    let startMinutes = new Date(startTime).getMinutes()
    let endHours = new Date(endTime).getHours()
    let endMinutes = new Date(endTime).getMinutes()
</script>
<div class="flex flex-col text-[#DEDEDE] bg-accent rounded-2xl p-[16px]">
    <div class="text-xl font-bold">{title}</div>
    <div class="flex flex-row items-center justify-left max-w-80">
        <p class="text-xl font-medium">
            {startHours <= 9 ? '0' : ''}{startHours}:{startMinutes <= 9 ? '0' : ''}{startMinutes} - {endHours <= 9 ? '0' : ''}{endHours}:{endMinutes <= 9 ? '0' : ''}{endMinutes}
        </p>
        <Dot class="w-10 h-10" />
        <p class="text-xl font-medium">{venue}</p>
    </div>
</div>