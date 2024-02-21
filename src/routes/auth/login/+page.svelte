<svelte:options runes={true} />

<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';

	const { data } = $props<{ data: import('./$types').PageData }>();
	const { redirectTo } = $derived(data);
</script>

<main class="flex flex-1 flex-col items-center justify-center overflow-hidden">
	<div
		class="grid w-[368px] overflow-hidden rounded-2xl bg-slate-200 pt-1 md:flex dark:bg-neutral-808 dark:text-neutral-309">
		<div class="flex h-full w-full items-center justify-center p-4">
			<SignIn
				provider="resend"
				className="w-full h-full"
				signInPage="auth"
				options={{ redirectTo, redirect: !!redirectTo }}>
				<svelte:fragment slot="email">
					<label class="px-1 font-bold" for="email">Email</label>
					<div
						class="mb-2 mt-1 flex items-center rounded-2xl border-2 border-neutral-309 px-3 py-2 dark:border-neutral-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
			</svg>
						<input
							class="border-none bg-transparent pl-2 outline-none focus-visible:ring-0"
							type="email"
							name="email"
							id="email"
							placeholder="Email" />
					</div>
				</svelte:fragment>
				<span
					slot="submitButton"
					class="mb-2 mt-1 flex h-16 w-full items-center justify-center rounded-xl bg-orange-600 py-2 text-lg font-semibold leading-6 text-white">
					Sign in with resend
				</span>
			</SignIn>
		</div>
	</div>
</main>