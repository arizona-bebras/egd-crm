<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import * as Calendar from './index.js';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';
	import type { ButtonVariant } from '../button/button.svelte';
	import { isEqualMonth, type DateValue, today, getLocalTimeZone } from '@internationalized/date';
	import type { Snippet } from 'svelte';
	import { Calendar as CalendarIcon } from '@lucide/svelte';
	import { fade, slide, fly } from 'svelte/transition';
	import Button from '../button/button.svelte';
	import { capitalize } from '$lib/utils/capitalize.js';
	import dayjs from 'dayjs';

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = 'short',
		buttonVariant = 'ghost',
		captionLayout = 'label',
		locale = 'ru-RU',
		months: monthsProp,
		years,
		monthFormat: monthFormatProp,
		yearFormat = 'numeric',
		day,
		disableDaysOutsideMonth = false,
		countEventPerDay,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
		captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
		months?: CalendarPrimitive.MonthSelectProps['months'];
		years?: CalendarPrimitive.YearSelectProps['years'];
		monthFormat?: CalendarPrimitive.MonthSelectProps['monthFormat'];
		yearFormat?: CalendarPrimitive.YearSelectProps['yearFormat'];
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
	} = $props();

	const monthFormat = $derived.by(() => {
		if (monthFormatProp) return monthFormatProp;
		if (captionLayout.startsWith('dropdown')) return 'short';
		return 'long';
	});
	// let markedDays = eventsZ.map((element) => {
	// 	return new Date(element.start_time).getDate();
	// });
	// $inspect(markedDays);
	$effect(() => {});

	function getEventCount(date: string) {
		let filter = countEventPerDay.filter((item) => item.event_date === date.toString());
		return filter[0]?.event_count;
	}

	let currentDate = $state(today(getLocalTimeZone()));
	let showCalendar = $state(false);

	$effect(() => {
		if (value) {
			showCalendar = false;
		}
	});
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	class={cn(
		'bg-background sticky! top-0 group/calendar w-full [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
		className,
	)}
	{locale}
	{monthFormat}
	{yearFormat}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Months>
			{#each months as month, monthIndex (month)}
				<Calendar.Month>
					<Calendar.Header
						class="bg-secondary border-border flex h-15 justify-between border-b px-4"
					>
						<p class="text-accent text-[16px] font-semibold">Сегодня</p>
						<div class="flex items-center">
							<Calendar.PrevButton
								variant={buttonVariant}
								class={cn('text-accent', showCalendar ? '' : 'opacity-0')}
							/>
							<div class="flex flex-col items-center justify-center">
								<p class="text-foreground text-lg font-semibold">Расписание</p>
								<div class="text-accent flex gap-2 font-semibold">
									<p>
										{capitalize(dayjs(value?.toString() ?? '').format('MMMM'))}
									</p>
								</div>
							</div>
							<Calendar.NextButton
								variant={buttonVariant}
								class={cn('text-accent', showCalendar ? '' : 'opacity-0')}
							/>
						</div>
						<Button
							class="{showCalendar ? 'bg-accent' : ' bg-accent/20'} ml-4 rounded-lg px-3 py-1.75"
							onclick={() => (showCalendar = !showCalendar)}
						>
							<CalendarIcon class={showCalendar ? 'stroke-primary' : 'stroke-accent '} />
						</Button>
					</Calendar.Header>
					{#if showCalendar}
						<div transition:slide={{ duration: 250 }}>
							<Calendar.Grid class="bg-primary z-4 mt-0 pb-4">
								<div class="w-full pt-2 text-center text-xl font-bold">
									{capitalize(
										month.value
											.toDate(getLocalTimeZone())
											.toLocaleString('default', { month: 'long' }),
									)}
								</div>
								<Calendar.GridHead class="mt-2">
									<Calendar.GridRow class="place-content-around select-none">
										{#each weekdays as weekday (weekday)}
											<Calendar.HeadCell>
												{weekday.slice(0, 2)}
											</Calendar.HeadCell>
										{/each}
									</Calendar.GridRow>
								</Calendar.GridHead>
								<Calendar.GridBody>
									{#each month.weeks as weekDates (weekDates)}
										<Calendar.GridRow class="mt-2 w-full place-content-around">
											{#each weekDates as date (date)}
												<Calendar.Cell {date} month={month.value}>
													{#if countEventPerDay.some((item) => item.event_date === date.toString())}
														<Calendar.Day
															class="{getEventCount(date.toString()) === 1
																? 'bg-accent/20'
																: getEventCount(date.toString()) === 2
																	? 'bg-accent/60 text-primary'
																	: 'bg-accent/80 text-primary'} rounded-full"
														/>
														<!--{:else if day}-->
														<!--	{@render day?.({-->
														<!--		day: date,-->
														<!--		outsideMonth: !isEqualMonth(date, month.value),-->
														<!--	})}-->
													{:else}
														<Calendar.Day
															class="[&[data-today]:not([data-selected])]:bg-opacity-100 data-[selected]:border-accent data-[selected]:rounded-full data-[selected]:border "
														/>
													{/if}
												</Calendar.Cell>
											{/each}
										</Calendar.GridRow>
									{/each}
								</Calendar.GridBody>
							</Calendar.Grid>
						</div>
					{/if}
				</Calendar.Month>
			{/each}
		</Calendar.Months>
	{/snippet}
</CalendarPrimitive.Root>
