<script>
// @ts-nocheck
	import {
		accountChainId,
		connected,
		connectMetamask,
		connectWalletConnect,
		disconnect,
		walletAddress
	} from '$lib/stores/provider';
    
import { onMount } from 'svelte'

import { ethers } from 'ethers'
import { slide } from 'svelte/transition'
import { theme } from '../../stores/nightmode'
import { contractAddress, contractABI, contractBytecode } from './contractABI'



let provider
let signer

let isExpanded = false;
function clickHandler() {
        
	isExpanded = !isExpanded
    console.log(isExpanded)
}

let ownerArray = [] // sets owner
let cAddressInfo = []
let ownerString = ''
let required
let ownerAddress
let inputField
let errorHandling = ''
let deployedInput = false
let contractAddressInput;
let createWalletExpanded = false;
let connectWalletExpanded = false;

async function addOwnerArray() {
        if (ownerArray.includes(ownerAddress)) {
            errorHandling = 'Invalid owner - cannot have multiple owners of the same address.'

        }  else if (!ownerArray.includes(ownerAddress)) {
            errorHandling - ''
        }
        if (ethers.utils.getAddress(ownerAddress) && !ownerArray.includes(ownerAddress)) {
            ownerArray.push(ownerAddress)
            ownerString += ownerAddress + ', '
            //console.log(ownerArray)
            errorHandling = ''
            inputField.value = ''
        }
        if (ownerArray) {
            deployedInput = true
        }
        // <div class='absolute top-15 bg-white mb-4 text-black  border-2 rounded-sm max-w-full max-h-2/4 z-20 mr-2'>
    }
function createInfoExpanded() {
    createWalletExpanded = !createWalletExpanded
}

function connectInfoExpanded() {
    connectWalletExpanded = !connectWalletExpanded
}

async function contractFactory() {
        provider = new ethers.providers.Web3Provider(window['ethereum'])
        signer = provider.getSigner()
        const walletContractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer)
        const deployingWallet = await walletContractFactory.deploy(ownerArray, required) // deploys contract 

        cAddressInfo.push(deployingWallet.address)
        cAddressInfo.push(ownerString)
        cAddressInfo.push(required)
        let contractAddressInfo = JSON.stringify(cAddressInfo)

        localStorage.setItem('contractAddress', contractAddressInfo) // sets address of contract and other info

        contractAddress.set(JSON.parse(localStorage.getItem('contractAddress'))) 
        
        const deployTransaction = deployingWallet.deployTransaction

        console.log(deployTransaction)
        console.log(deployingWallet.address)


        // db
        const url = 'http://localhost:3300/contracts'
        const submitData = async url => {
            const res = await fetch(url, { 
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: contractAddressInfo,
             })

            if (!res.ok) { throw new Error(`${res.status}: ${res.statusText}`) }
                return res
            }
        submitData(url)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    async function callContract() {
        cAddressInfo.push(contractAddressInput)
        cAddressInfo.push('Unknown')
        cAddressInfo.push('Unknown')
        localStorage.setItem('contractAddress', JSON.stringify(cAddressInfo))
        //console.log('Called contract')
        console.log(localStorage.getItem('contractAddress'))
    }


</script>



<main>
        {#if connected} <!-- Add margin 2 for smaller screens maybe ? Fuck -->
        <button class=" relative max-w-[15rem] ml-2 py-2 px-4 border border-dotted border-transparent 
        text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700" on:click={clickHandler}>
            Create/connect to a wallet
        </button>
        {#if isExpanded}
        <div class='absolute bg-white text-black rounded-sm max-w-[273px] max-h-2/4 z-20 ml-1.5 dark:bg-zinc-700 border-2 dark:border-0 dark:border-zinc-700' transition:slide>
            <div class="rounded-md p-1 shadow-sm -space-y-px z-10 ">
                {#if errorHandling != ''}
                <div class='text-red-500 pb-2.5 pt-1' transition:slide>{errorHandling}</div>
                {/if}
                <div class="max-w-3/4 flex flex-column mr-1">
                    <label for="etheraddress" class="sr-only">Add owner(s) here</label>
                    <input bind:this={inputField} bind:value={ownerAddress} id="etheraddress" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs" placeholder="Add owner(s) here">
                    <button on:click={addOwnerArray} class="flex justify-center pb-2 ml-2 w-10 ml-3 py-2.5 px-5 text-white border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 bg-indigo-600 hover:bg-indigo-700 z-10">Add</button>
                </div>
                <div class="max-w-3/4 flex flex-column mr-1">
                    <label for="value" class="sr-only">Required amount of approvals for a transaction</label>
                    <input bind:value={required} id="valuesubmit" name="value" type="number" min="0" step="1" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs" placeholder="Required approvals for a transaction">
                    <div class=" ml-2 w-10 pl-2 ml-3 py-2 px-8 border border-transparent rounded-md bg-white z-0 dark:bg-zinc-700"></div>
                </div>
                <div class="pt-2.5 flex justify-end pl-2 pb-3">
                    <button class="relative w-40 py-2 px-4 mr-1 flex justify-center items-end border border-transparent 
                    text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 " on:click={contractFactory}>Create wallet</button>
                </div>
                {#if $theme == 'light'}
                <button on:click={createInfoExpanded}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 z-50">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                        {#if createWalletExpanded}
                            <div class='absolute font-xxs gap-3 mr-1 bg-white bottom text-black p-1 border-2 rounded-sm max-w-full max-h-2/4 z-40 dark:border-zinc-700 dark:bg-zinc-700' transition:slide>
                                Add owner(s) in the first input, and click the 'Add' button per address (per owner). Then,
                                in the second input, add an integer of the required amount of owner approvals to execute a transaction.
                            
                            </div>
                        {/if}
                </button>
                {/if}
                {#if $theme == 'dark'}
                <button on:click={createInfoExpanded}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 z-50">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                        {#if createWalletExpanded}
                            <div class='absolute font-xxs gap-3 bg-white bottom text-white p-1 border-2 rounded-sm max-w-full max-h-2/4 z-40 dark:border-zinc-700 dark:bg-zinc-700' transition:slide>
                                Add owner(s) in the first input, and click the 'Add' button per address (per owner). Then,
                                in the second input, add an integer of the required amount of owner approvals to execute a transaction.
                            
                            </div>
                        {/if}
                </button>
                {/if}
                <hr class="w-3/4 flex  ml-8 dark:bg-black">

                <div class="max-w-3/4 flex flex-row mr-1 pt-3">
                    <label for="etheraddress" class="sr-only">Connect to contract</label>
                    <input bind:value={contractAddressInput} id="etheraddress" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs" placeholder="Connect to contract address">
                    <div class=''>
                    </div>
                </div>
                <div class='pt-2.5 flex justify-end pl-2 pb-2'>
                    <button class="relative w-40 py-2 px-4 mr-1 flex justify-center items-end border border-transparent 
                    text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700" on:click={callContract} >Connect to wallet</button>
                </div>
                <!--<button class="relative w-40 py-2 px-4 flex justify-end items-end border border-transparent 
                text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700">Add another owner</button>-->
            </div>
            {#if deployedInput}
            <div class='absolute font-xxs bg-white text-black p-1 border-2 dark:border-zinc-700 dark:bg-zinc-700 rounded-sm max-w-full bottom--5 max-h-2/4 z-0' transition:slide>
                
                <div class="font-mono dark:text-gray-300">Owners: <div class='text-slate-500 dark:text-white'>{ownerString}</div></div>
                {#if required != undefined}
                    <div class="font-mono flex flex-row pt-1 dark:text-gray-300">Required approvals: <div class='text-slate-500 pl-1 dark:text-white'>{required}</div></div>
                {/if}
            </div>
            {/if}
            {#if $theme == 'light'}
            <button on:click={connectInfoExpanded}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 z-50">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                    {#if connectWalletExpanded}
                        <div class='absolute font-xxs bg-white bottom text-black p-1 border rounded-sm max-w-full max-h-2/4 z-40 dark:border-zinc-700 dark:bg-zinc-700' transition:slide>
                            Add owner(s) in the first input, and click the 'Add' button per address (per owner). Then,
                            in the second input, add an integer of the required amount of owner approvals to execute a transaction.
                        
                        </div>
                    {/if}
            </button>
            {/if}
            {#if $theme == 'dark'}
            <button on:click={connectInfoExpanded} class=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 z-50 ml-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                    {#if connectWalletExpanded}
                        <div class='absolute font-xxs bg-white bottom text-white p-1 border-10 rounded-sm max-h-2/4 z-40 dark:border-zinc-700 dark:bg-zinc-700' transition:slide>
                            Add the contract/wallet address in the input and click the 'Connect to wallet' button. Once your wallet is connected, it will be stored in localStorage,
                            and you can tell other owners to connect by providing them the contract address. 
                        
                        </div>
                    {/if}
            </button>
            {/if}
        </div>

        <!--<button class="relative w-40 py-2 px-4 flex justify-end items-end border border-transparent 
                text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700">Add another owner</button>-->
        {/if}
    {/if}
</main>

<style>

    .font-xxs {
        font-size: 0.6rem;
    }
</style>
