<script>
// @ts-nocheck

    import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
    import {
		accountChainId,
		connected,
		connectMetamask,
		connectWalletConnect,
		disconnect,
		walletAddress,
		accountProvider,
	} from '$lib/stores/provider';
	import { ethers } from "ethers";

    import { contractAddress, contractABI } from '../../lib/abis/contracts/contractABI'
    
    import { selectedOption, transactionID, awaitingTx, errorHandling } from '../../lib/stores/stores'
	import Dropdown from './other/Dropdown.svelte'
	import Guide  from './other/Needhelp.svelte'


    onMount(() => {
		provider = new ethers.providers.JsonRpcProvider(window['ethereum']);
        contractAddress.set(JSON.parse(localStorage.getItem('contractAddress')))

	})
    let provider;
	let signer
	let contract

    let txid
    let txLog
    let txAwaiting
	let txSuccess 

    async function revokeTransaction() {
        try {
            txLog = txid
            provider = new ethers.providers.Web3Provider(window['ethereum'])
            signer = provider.getSigner()
            contract = new ethers.Contract($contractAddress[0], contractABI, signer)
            console.log('fdgkndsfsdfkds')

            if (txid == undefined || '') {
				console.log(txid)
				errorHandling.set('No transaction ID provided.');
			}
            const txRevoke = await contract.revoke(txid)
            //txAwaiting = 'Transaction revoked. Awaiting transaction to be revoked on network..'
            errorHandling.set('')
            awaitingTx.set('Transaction revoked. Awaiting transaction to be revoked on network..')
            transactionID.set(txid)
            await txRevoke.wait()
            //txSuccess = `<i style='text-green-500'>Transaction ID ${txLog} successfully revoked.</i> <a class='text-blue-400' href='http://goerli.etherscan.io/tx/${txRevoke.hash}' target='_blank'>Etherscan</a>`
            awaitingTx.set(`<i style='text-green-500'>Transaction ID ${txLog} successfully revoked.</i> <a class='text-blue-400' href='http://goerli.etherscan.io/tx/${txRevoke.hash}' target='_blank'>Etherscan</a>`)
        } catch (error) {
            console.log(error)
            if (error.message.includes('execution reverted: invalid owner')) {
				errorHandling.set('Transaction reverted: invalid owner')
			}
            if (error.message.includes('tx does not exist')) {
                errorHandling.set('Transaction reverted: Transaction ID does not exist.')
            }
            if (error.message.includes('tx not approved')) {
                errorHandling.set('Transaction reverted: Transaction ID needs to be approved.')
            }
            if (error.message.includes('tx was already executed')) {
                errorHandling.set('Transaction reverted: This transaction ID was already executed.')
            }            

        }
    }
</script>

<div>
    <div class="max-w-md w-full space-y-8 mt-2">
        <div class='mt-3'>
            {#if $errorHandling.includes('invalid owner')}
                <p class="text-center text-sm text-red-400" transition:slide>
                    {$errorHandling}
                </p>
            {:else if $errorHandling.includes('No transaction ID')}
                <p class="text-center text-sm text-red-400" transition:slide>
                    {$errorHandling}
                </p>
            {:else if $errorHandling.includes('Transaction ID does not exist')}
                <p class="text-center text-sm text-red-400" transition:slide>
                    {$errorHandling}
                </p>
            {:else if $errorHandling.includes('Transaction ID needs to be approved.')}
                <p class="text-center text-sm text-red-400" transition:slide>
                    {$errorHandling}
                </p>
            {:else if $errorHandling.includes('This transaction ID was already executed.')}
                <p class="text-center text-sm text-red-400" transition:slide>
                    {$errorHandling}
                </p>

            <!-- successful revoked transaction, process-->
            {:else if $awaitingTx.includes('Awaiting transaction to be revoked on network..')}
                <p class="text-center text-sm text-grey dark:text-white" transition:slide>
                    <i>{$awaitingTx}</i>
                </p>
            {:else if $awaitingTx.includes('successfully revoked.')}
                <p class="text-center text-sm dark:text-white" transition:slide>
                    {@html $awaitingTx}
                </p>
            {:else}
                <p class="text-center text-sm text-grey dark:text-white">
                    Revoke a transaction (needs to be approved first)
                </p>
            {/if}
        </div>

        <div class="rounded-md shadow-sm -space-y-px mt-8">
            <div>
                <label for="txid" class="sr-only">txid</label>
                <input bind:value={txid} id="txidRevoke" name="txid" type="number" min="0" step="1" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Transaction ID">
            </div>
        </div>
      
        <div>
            <button on:click={revokeTransaction} type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <!-- Heroicon name: solid/lock-closed -->
                      <img class="h-5 w-5 text-red-500 group-hover:text-red-400" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Black_close_x.svg" alt="revoke icon">
                </span>
                Revoke
                <span class="absolute right-0 pr-1">
                    <Dropdown></Dropdown>
                </span>
            </button>

            <div class="flex items-center justify-end mt-2"> <!-- Provides a prompt for a guide for specific function invocation.-->
                <button class='w-full'>
                    <div class="text-sm text-indigo-600 hover:text-indigo-400">
                        <Guide></Guide>
                    </div>
                </button>
            </div>
        </div>
    </div>
</div>