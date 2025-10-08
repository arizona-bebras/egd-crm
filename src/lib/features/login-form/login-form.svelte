<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/features/login-form/schema';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { Input } from '$lib/components/ui/input';
	import { useSuperForm } from '$lib/utils/useSuperform';
	import { Button } from '$lib/components/ui/button';
	import gerb from '$lib/assets/Герб.png';

	let isInvalidUser = $state(false);

	async function signin(email: string, password: string) {
		// await supabase.auth.signInWithPassword({ email, password });
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error === null) {
			goto('/');
		} else {
			isInvalidUser = true;
		}
	}

	$effect(() => {
		validateForm().then((response) => {
			isFormCorrect = response.valid;
		});
		$formData;
	});

	let isFormCorrect = $state(false);
	const { formData, form, enhance, reset, tainted, validateForm } = useSuperForm(loginSchema, {
		async afterSubmit(data) {
			console.log('Data valid, do action here', data);
			await signin(data.email, data.password);
		},
		validationMethod: 'auto',
	});
</script>

<div class="h-full w-full bg-gradient-to-tr from-neutral-400 to-neutral-200">
	<div class="flex h-full items-center">
		<Card.Root class="mx-auto max-w-[300px] border-2 pt-4">
			<Card.Header class="flex flex-col items-center justify-center">
				<img src={gerb} class="h-22.5 w-25" />
				<Card.Title class="text-2xl">Кабинет депутата</Card.Title>
				<Card.Description>Екатеринбургской городской Думы</Card.Description>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance>
					<Form.Field {form} name="email" class="mb-5">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label class="mb-4">Электронная почта</Form.Label>
								<Input
									{...props}
									bind:value={$formData.email}
									class="border-accent  bg-white"
									autocomplete="off"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password" class="mb-5">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label class="mb-4">Пароль</Form.Label>
								<Input
									{...props}
									bind:value={$formData.password}
									class="border-accent bg-white"
									autocomplete="off"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button disabled={!isFormCorrect} class="bg-accent">Войти</Form.Button>
				</form>
				{#if isInvalidUser}
					<p class="font-semibold text-red-500">Неверный адрес электронной почты или пароль</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
