import { writable } from 'svelte/store';
import { onMount } from 'svelte';
import { browser } from '$app/environment'
export const selectedOption:any = writable('Submit');
export const connectedAddress:any = writable('')

if (browser) {
    selectedOption.set(sessionStorage.getItem('call') ?? "Submit")
    connectedAddress.set(sessionStorage.getItem('connectedAddress'))
}
export const awaitingTx:any = writable('')
export const transactionID:any = writable()
export const errorHandling:any = writable('')



/// beesgsgsgfdsgfdsgd
