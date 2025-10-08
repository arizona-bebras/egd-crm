<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Item from '$lib/components/ui/item';
	import { supabase } from '$lib/supabaseClient';
	import { ChevronRightIcon } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';

	let { user_id, name, role_name, photo_path } = $props();

	const avatarQuery = createQuery(() => ({
		queryKey: ['avatar', user_id, photo_path],
		queryFn: () => {
			if (photo_path) {
				return supabase.storage.from('photos').getPublicUrl(photo_path, {
					transform: { quality: 50, width: 150, height: 150, resize: 'cover' },
				});
			} else return null;
		},
		select: (q) => q?.data.publicUrl,
	}));
</script>

<Item.Root variant="outline" class="bg-primary border-black/25" size="sm">
	{#snippet child({ props })}
		<a href="profile/{user_id}" {...props}>
			<Item.Media>
				<Avatar.Root class="size-9 rounded-md">
					{#if avatarQuery.isSuccess && avatarQuery.data}
						<Avatar.Image class="rounded-md" loading="lazy" src={avatarQuery.data} alt="@shadcn" />
					{/if}
					<Avatar.Fallback class="rounded-md">
						{name.split(' ')[0]?.at(0)}
						{name.split(' ')[1]?.at(0)}
					</Avatar.Fallback>
				</Avatar.Root>
			</Item.Media>
			<Item.Content>
				<Item.Title>{name}</Item.Title>
				<Item.Description class="text-accent font-medium">{role_name}</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="icon">
					<ChevronRightIcon class="stroke-accent size-6" />
				</Button>
			</Item.Actions>
		</a>
	{/snippet}
</Item.Root>
