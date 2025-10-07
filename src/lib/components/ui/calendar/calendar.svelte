<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import * as Calendar from './index.js';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';
	import type { ButtonVariant } from '../button/button.svelte';
	import { isEqualMonth, type DateValue, today, getLocalTimeZone } from '@internationalized/date';
	import type { Snippet } from 'svelte';
	import * as events from 'node:events';

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
		'bg-background group/calendar w-full p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
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
				<Calendar.Month class="bg-primary">
					<Calendar.Header class="flex justify-center">
						<Calendar.PrevButton variant={buttonVariant} />
						<div>
							{currentDate.toDate(getLocalTimeZone()).toLocaleString('default', { month: 'long' })}
							{currentDate.year}
						</div>
						<Calendar.NextButton variant={buttonVariant} />
						<!--						<Calendar.Caption-->
						<!--							{captionLayout}-->
						<!--							months={monthsProp}-->
						<!--							{monthFormat}-->
						<!--							{years}-->
						<!--							{yearFormat}-->
						<!--							month={month.value}-->
						<!--							bind:placeholder-->
						<!--							{locale}-->
						<!--							{monthIndex}-->
						<!--						/>-->
						<!--						<Calendar.MonthSelect aria-label="Select month" class="w-full" />-->
						<!--						<Calendar.YearSelect aria-label="Select year" />-->
					</Calendar.Header>
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow class="select-none">
								{#each weekdays as weekday (weekday)}
									<Calendar.HeadCell>
										{weekday.slice(0, 2)}
									</Calendar.HeadCell>
								{/each}
							</Calendar.GridRow>
						</Calendar.GridHead>
						<Calendar.GridBody>
							{#each month.weeks as weekDates (weekDates)}
								<Calendar.GridRow class="mt-2 w-full">
									{#each weekDates as date (date)}
										<Calendar.Cell {date} month={month.value}>
											{console.log(getEventCount(date.toString()))}
											{#if countEventPerDay.some((item) => item.event_date === date.toString())}
												<Calendar.Day
													class="{getEventCount(date.toString()) === 1
														? 'bg-accent/20'
														: getEventCount(date.toString()) === 2
															? 'bg-accent/60'
															: 'bg-accent'} rounded-full"
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
				</Calendar.Month>
			{/each}
		</Calendar.Months>
	{/snippet}
</CalendarPrimitive.Root>
