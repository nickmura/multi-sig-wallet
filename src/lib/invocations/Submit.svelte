<script>
// @ts-nocheck

	// @ts-ignore
	
    import { slide } from 'svelte/transition'
    import {
		accountChainId,
		connected,
		connectMetamask,
		connectWalletConnect,
		disconnect,
		walletAddress,
		accountProvider,
        networkProviders 
	} from '$lib/stores/provider';

	import { ethers } from "ethers";
	import { onMount } from 'svelte';
    
	import Dropdown from './other/Dropdown.svelte'
	import Guide  from './other/Needhelp.svelte'

    import { contractAddress, contractABI } from '../../lib/abis/contracts/contractABI'
    
	import { selectedOption, transactionID, awaitingTx, errorHandling } from '../../lib/stores/stores'


    let provider
    let contractAddr

	let signer
	let contract

    let recievingAddress

	let recievingValue

	let txLog

	/** onMount(() => {
        contractAddr = $contractAddress[0];
	}) **/

    async function submitTransaction() {
        try {
            // @ts-ignore
            provider = new ethers.providers.Web3Provider(window['ethereum'])
            signer = provider.getSigner()
            contract = new ethers.Contract($contractAddress[0], contractABI, signer)
            let balance = ethers.utils.formatEther(ethers.BigNumber.from(await signer.getBalance()))

    
            if (recievingAddress == undefined || '') {
				// @ts-ignore
				console.log(recievingAddress)
				errorHandling.set('No address provided.');
			}
            // @ts-ignore
            if (recievingAddress == '' && recievingValue) {
				// @ts-ignore
				console.log(recievingAddress)
				errorHandling.set('No address provided.');
			}

            if (recievingValue == undefined || '' ) {
				errorHandling.set('No value provided.');
			}
            
			if (recievingAddress == undefined || '' && recievingValue == undefined || '') {
				errorHandling.set('No address or value provided.')
			}
            if (recievingValue > balance) {
                errorHandling.set('Insufficient funds for transaction.')
            }

            const txSubmit = await contract.submit(recievingAddress, ethers.utils.parseEther(String(recievingValue)), "0x", { value: ethers.utils.parseEther(String(recievingValue)) })
            
            errorHandling.set('valid')
            awaitingTx.set('Awaiting transaction to be submitted on network..')
            contract.once('Submit', (log) => {
                    txLog = `${log.toString()}`
                    transactionID.set(txLog)
                })
            await txSubmit.wait()

            awaitingTx.set(`<i style='text-green-500'>Transaction successfully submitted.</i> <a class='text-blue-400' href='http://goerli.etherscan.io/tx/${txSubmit.hash}' target='_blank'>Etherscan</a>`)
        } catch (error) {
            console.log(error)
            if (error.message.includes('User denied transaction signature.')) {
				errorHandling.set('')
			}
			// @ts-ignore
			if (error.message.includes('execution reverted: invalid owner')) {
				errorHandling.set('Transaction reverted: Invalid owner')
			}
			if (error.message.includes('err: insufficient funds for gas')) {
				errorHandling.set('Insufficient funds for transaction.')
			}
			if (error.message.includes('invalid address or ENS name')) {
				errorHandling.set('Invalid or no address provided.')
			}
        }
    }
</script>

<main>
    <div>
		<div class="max-w-md w-full space-y-8 mt-2">
			<div class='mt-3'>
				{#if $errorHandling === 'No address provided.'}
					<p class="text-center text-sm text-red-400" >
						{$errorHandling}
					</p>
				{:else if $errorHandling === 'No value provided.'}
					<p class="text-center text-sm text-red-400" >
						{$errorHandling}
					</p>
				{:else if $errorHandling === 'Invalid or no address provided.'}
					<p class="text-center text-sm text-red-400" >
						{$errorHandling}
					</p>
					{:else if $errorHandling === 'Invalid or no address provided.'}
					<p class="text-center text-sm text-red-400" >
						{$errorHandling}
					</p>
				{:else if $errorHandling === 'No address or value provided.'}
					<p class="text-center text-sm text-red-400" >
						{$errorHandling}
					</p>				
				{:else if $errorHandling === 'Transaction reverted: Invalid owner'}
					<p class="text-center text-sm text-red-600" >
						{$errorHandling}
					</p>
				{:else if $errorHandling === 'Insufficient funds for transaction.'}
					<p class="text-center text-sm text-red-600" >
						{$errorHandling}
					</p>
	
				<!--successful submitted transaction, process-->
				{:else if $awaitingTx.includes('Awaiting transaction to be submitted on network..') && $errorHandling.includes('valid')}
					<p class="text-center text-sm text-grey dark:text-white" >
						{$awaitingTx}
					</p>
				{:else if $awaitingTx.includes('Transaction successfully submitted.')}
					<p class="text-center text-sm dark:text-white" >
						{@html $awaitingTx}
					</p>
				{:else}
					<p class="text-center text-sm text-grey dark:text-white">
						Submit a transaction
					</p>
	
				{/if}
				
			</div>
			<div class="rounded-md shadow-sm -space-y-px mt-8">
				<div>
					<label for="etheraddress" class="sr-only">Ethereum address</label>
					<input bind:value={recievingAddress} id="etheraddress" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Ethereum address">
				</div>
				<div>
					<label for="value" class="sr-only">Value</label>
					<input bind:value={recievingValue} id="valuesubmit" name="value" type="number" min="0" step="0.05" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Value amount">
				</div>
			</div>
		  
			<div>
				<button on:click={submitTransaction} type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						  <!-- Heroicon name: solid/lock-closed -->
						<svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
						  </svg>
					</span>
					Submit
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
</main>