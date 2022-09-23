<script>
    import { onMount } from 'svelte/internal';
    import { slide } from 'svelte/transition'

    import Submit from '../Submit.svelte';
    import Approve from '../Approve.svelte';
    import Revoke from '../Revoke.svelte';
    import Execute from '../Execute.svelte';

    import { selectedOption } from '../../stores/stores'
    import { theme } from '../../stores/nightmode'

    onMount(() => {

	})


	let isExpanded = false

	function clickHandler() {
		isExpanded = !isExpanded
        console.log(isExpanded)
	}

</script>

<main>

	<div class="flex flex-col w-full mt-1"> <!-- Provides a prompt for a tutorial for specific function invocation.-->
		<div class='relative'>
            <button on:click={clickHandler} class=" flex justify-end w-full">
                <div class="text-sm text-indigo-600 hover:text-indigo-400">
                {#if $theme == 'dark'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 z-50">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                {:else if $theme == 'light'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 z-50">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                {/if}
                </div>
            </button>
            
            {#if isExpanded}
            <span>
                {#if $selectedOption == 'Execute'}
                <div class='absolute h-51 border-1 mt-2 right-0 rounded-md border-stone-400 text-black dark:border-zinc-600'>
                    <p class='flex text-s-exec text-left m-1 ml-2 dark:text-white'>After submitting, and approving a transaction by the required
                        amount of owners, input the same transaction ID, and click the 'Execute' button to execute that transaction. After having
                        the required amount of approvals, any owner can execute the transaction by simply invoking the function (clicking the button).
                        The required amount of approvals, in other words the number of owners to approve a transaction is set when you deployed the instance 
                        is dependant for an owner to execute.
                    </p>

                    <div class="ml-64">
                        <img src='https://raw.githubusercontent.com/nickmura/multi-sig-wallet/main/img/execute0.png' width="181" height="81.6" alt='Executing transaction demonstration'>
                    </div>
                </div>
                {/if}

                {#if $selectedOption == 'Revoke'}
                <div class='absolute h-50 border-1 mt-2 right-0 rounded-md border-stone-400 text-black dark:border-zinc-600'>
                    <p class='flex text-s text-left m-1 ml-2 mt-1 dark:text-white'>After submitting, and approving a transaction, if the approval was simply a
                        mistake, you can revoke your approval as an owner. Input the same transaction ID, and click the 'Approve' button to revoke your approval of that transaction. 
                        Note that you or other owners can still approve this transaction, this does not remove the transaction.
                    </p>

                    <div class="ml-32 mt-7">
                        <img src='https://raw.githubusercontent.com/nickmura/multi-sig-wallet/main/img/revoke0.png' width="196" height="88" alt='Executing transaction demonstration'>
                    </div>
                </div>
                {/if}
                {#if $selectedOption == 'Approve'}
                

                <div class='absolute h-50 border-1 mt-2 right-0 rounded-md border-stone-400 text-grey dark:border-zinc-600'>
                    <p class='flex text-s text-left mr-1 ml-2 mt-1 text-grey dark:text-white'>After submitting, you can approve the transaction by inputting the provided
                        transaction ID and clicking the 'Approve' button. The required amount of approvals, in other words the number of
                        owners to approve a transaction is set when you deployed the instance is dependant for an owner to execute.
                    </p>

                    <div class="ml-32 mt-8">
                        <img src='https://raw.githubusercontent.com/nickmura/multi-sig-wallet/main/img/approve0.png' width="196" height="88" alt='Executing transaction demonstration'>
                    </div>
                </div>
                {/if}
                {#if $selectedOption == 'Submit'}
                <div class='absolute h-50 border-1 mt-2 right-0 rounded-md border-stone-400 text-black dark:border-zinc-600'>
                    <p class='flex text-s-exec text-left m-2 dark:text-white'>Once you have created an instance for an owner, to submit a 
                        transaction, add an ethereum address in the first input, and the value you want to send in 
                        the transaction in the second input, and then click "Submit". Once you have submitted, you will
                        recieve a transaction ID (it may take a few moments). Use this Transaction ID to approve, revoke,
                        and execute this transaction as an owner!
                    </p>

                    <div class="flex ml-60 -mt-4">
                        <img src='https://raw.githubusercontent.com/nickmura/multi-sig-wallet/main/img/submit0.png' width="196" height="88" alt='Executing transaction demonstration'>
                    </div>
                </div>
                {/if}
            </span>
            {/if}
        </div>
	</div>
</main>

<style>
    .text-s {
        font-size: 11.5px;
        line-height: 1.2rem;

    }
    .text-s-exec {
        font-size: 10.5px;
        line-height: 1.2rem;

    }
    .border-1 {
        border-width: 1px;
    }
    .h-50 {
        height: 200px;
    }
    .h-51 {
        height: 210px;
    }

</style>