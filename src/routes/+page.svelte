<script lang="ts">
	import { slide } from 'svelte/transition'
	import {
		accountChainId,
		connected,
		connectMetamask,
		connectWalletConnect,
		disconnect,
		walletAddress
	} from '$lib/stores/provider';
	import { balanceOnBlock } from '$lib/stores/state';
	import { formatEther } from 'ethers/lib/utils';

	import { contractAddress, contractABI } from '../lib/abis/contracts/contractABI'
	import { selectedOption, transactionID, awaitingTx, errorHandling, connectedAddress } from '../lib/stores/stores'
	
	import Connect from '../lib/invocations/other/Connect.svelte'
	import Factory from '../lib/abis/contracts/ContractFactory.svelte'
	import WalletInfo from '../lib/invocations/other/WalletInfo.svelte'

	import Nightmode from '../lib/invocations/other/Nightmode.svelte'
	import Guide from '../lib/invocations/other/Needhelp.svelte'

	import Submit from '../lib/invocations/Submit.svelte'
	import Approve from '../lib/invocations/Approve.svelte'
	import Revoke from '../lib/invocations/Revoke.svelte'
	import Execute from '../lib/invocations/Execute.svelte'

	
	let isExpanded = false;
	function clickHandler() {
		isExpanded = !isExpanded
        console.log(isExpanded)
	}

</script>

<main class="">
	{#if !connected} <!-- Just to add margin between the buttons. -->
	<div class="max-w-full flex justify-between mr-2 mt-2">
		<div class='flex flex-wrap'>
			<Connect></Connect>
			<div class=""> <!-- Add reactivity s:mt-2-->
				<Factory></Factory>
			</div>
		</div>
		<div>
			<Nightmode></Nightmode>
		</div>
	</div>
	{/if}
	{#if connected}
		<div class="max-w-full flex justify-between  mt-2">
		<div class='flex flex-wrap'>

			<Connect></Connect>

			<div class=""> <!-- Add reactivity s:mt-2-->
				<Factory></Factory>
			</div>
			{#if $contractAddress}
			<div>
				<WalletInfo></WalletInfo>
			</div>
			{/if}

		</div>
		<div class='mr-2'>
			<Nightmode></Nightmode>
		</div>
	</div>
	{/if}


	  <div class="flex mx-auto w-full justify-center py-10 px-4 h-2/4 -mb-3">
		<div class="max-w-md w-full space-y-8 ">
		  <div>
			<img src='../../../../static/multisig-logo.png' class="mx-auto h-12 w-auto" alt="logo">
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">multi-sig.wallet</h2>
			<!--{#if $selectedOption === 'Submit' || $selectedOption === 's' || data === 'Submit'} Submit invocation error handling and successful transaction messages-->
			<!--{/if}-->
			<!--{#if $selectedOption === 'Approve' || data === 'Approve'} Approve invocation error handling and successful transaction messages-->
			<!--{/if}-->
			<!--{#if $selectedOption === 'Revoke' || data === 'Revoke'} Revoke invocation error handling and successful transaction messages-->	
			<!--{/if}-->
			<!--{#if $selectedOption === 'Execute' || data === 'Execute'} Execute invocation error handling and successful transaction messages-->
			<!--{/if}-->

			{#if $transactionID}
			<p class="text-center text-sm text-green-500 mt-2">
				{`Last logged transaction ID: ${$transactionID}`}
			</p>
			{/if}

			
			
	{#if $selectedOption==='Submit'} 
		<Submit></Submit>

	{:else if $selectedOption==='Approve'} 
		<Approve></Approve>
	
	{:else if $selectedOption==='Revoke'}
	
		<Revoke></Revoke>

	{:else if $selectedOption==='Execute'} 
		<Execute></Execute>

	{/if} 



</div>
</main>