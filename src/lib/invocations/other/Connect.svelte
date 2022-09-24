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



<!--<div class="flex mr-2 mt-2 mx-auto w-2/4 items-start"></div>-->

    {#if !$connected}

    <div class='max-w-max'>
    <button id='connect-metamask' on:click={connectMetamask} type="submit" class="relative max-w-[10rem]  py-2 px-4 flex items-end border border-transparent 
    text-sm font-medium rounded-md text-white pl-10 ml-2 bg-indigo-600 hover:bg-indigo-700">
      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
        <img src='./metamask-logo-black-and-white.png' class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" alt='metamask image' aria-hidden="true">
      </span>
        Connect wallet
    </button>
    </div>
    {/if}
    {#if $connected}
    
        <div class="max-w-max">
            <button id='connect-metamask' on:click={connectMetamask} type="submit" class="relative max-w-[10rem]  py-2 px-4 flex items-end border border-transparent 
            text-sm font-medium rounded-md text-white pl-5 ml-2 bg-indigo-600 hover:bg-indigo-700">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <img src='./metamask-logo-black-and-white.png' class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" alt='metamask image' aria-hidden="true">
                </span>
                <div class="pl-4">
                    {$walletAddress.substring(0,5)}...{$walletAddress.substring(38)}
                </div>
            </button>
        


        </div>

    {/if}

        <div class="">
            <!-- <NightOrDay></NightOrDay> -->
        </div>

