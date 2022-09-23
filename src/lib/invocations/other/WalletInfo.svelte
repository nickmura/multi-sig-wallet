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

	import { contractAddress, contractABI } from '../../abis/contracts/contractABI'
    import Factory from '../../abis/contracts/ContractFactory.svelte'
	import { selectedOption, transactionID, awaitingTx, errorHandling, connectedAddress } from '../../stores/stores'
    
    let isExpanded = false;
    
    function clickHandler() {
		isExpanded = !isExpanded
        console.log(isExpanded)
	}
</script>

{#if $contractAddress}
<div class="flex flex-wrap-reverse xs:mr-2 ">
    <button id='connect-metamask' on:click={clickHandler} type="submit" class="relative w-max-[10rem] py-2 px-4 flex justify-center border border-transparent 
    text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 ml-2 mb-2 bg-indigo-300 hover:bg-indigo-400">

        <div>
            Wallet {$contractAddress[0].substring(0,6)}...
        </div>
    </button>
</div>
{#if isExpanded}
    <div class='absolute font-xxs gap-3 bg-white top-12 text-black p-1 ml-2 border-2 rounded-sm max-w-[338px] max-h-2/4 z-30 dark:border-zinc-700 dark:bg-zinc-700' transition:slide>
        <div class="font-mono flex flex-row pt-1 dark:text-white">Contract address: <div class='text-slate-500 pl-1 dark:text-white'>{$contractAddress[0]}</div></div>
        <div class="font-mono flex flex-row pt-1 dark:text-white">Owners: <div class='text-slate-500 pl-1 dark:text-white'>{$contractAddress[1]}</div></div>
        <div class="font-mono flex flex-row pt-1 dark:text-white">Required approvals: <div class='text-slate-500 pl-1 dark:text-white'>{$contractAddress[2]}</div></div>
    </div>
{/if}

{/if}

<style>
    .font-xxs {
        font-size: 0.6rem;
    }

</style>