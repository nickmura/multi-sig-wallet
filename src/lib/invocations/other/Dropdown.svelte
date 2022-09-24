<script>
    import { slide } from 'svelte/transition'

    import Submit from '../Submit.svelte';
    import Approve from '../Approve.svelte';
    import Revoke from '../Revoke.svelte';
    import Execute from '../Execute.svelte';

    import { errorHandling, selectedOption } from '../../stores/stores'
        
        let isExpanded = false
    
        function clickHandler() {
            isExpanded = !isExpanded
            console.log(isExpanded)
        }
    
    
        function submit() {
            console.log('dddd')
            errorHandling.set('')
            selectedOption.set('Submit')
            sessionStorage.setItem('call', 'Submit');
        }
    
        function approve() {
            console.log('aaaa')
            sessionStorage.setItem('call', 'Approve');
            errorHandling.set('')
            selectedOption.set('Approve')
        }
    
        function revoke() {
            sessionStorage.setItem('call', 'Revoke');
            errorHandling.set('')
            selectedOption.set('Revoke')
        }
        function execute() {
    
            sessionStorage.setItem('call', 'Execute');
            errorHandling.set('')
            selectedOption.set('Execute')
        }
    </script>
    
    <main class="flex justify-end">
        <div class="h-min relative">
        <button class="" on:click|stopPropagation={clickHandler}>
            <svg class="h-6 w-6 text-indigo-500 group-hover:text-indigo-400" width="48" height="48" viewBox="0 0 48 48">
                <path d="M14 20l10 10 10-10z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
        </button>
        {#if isExpanded}
        <ul class='absolute top-8 bg-white text-black flex justify-end flex-col pl-1 pr-1 pb-1 pt-1 border-2 rounded-sm right-0 translate-x-6 z-10'>
            <div>
                <button class="pl-1 pr-1 rounded-sm hover:bg-gray-200" on:click|stopPropagation={submit}>Submit</button>
                <button class="pl-1 pr-1 rounded-sm hover:bg-gray-200" on:click|stopPropagation={approve}>Approve</button>
                <button class="pl-1 pr-1 rounded-sm hover:bg-gray-200" on:click|stopPropagation={revoke}>Revoke</button>
                <button class="pl-1 pr-1 rounded-sm hover:bg-gray-200" on:click|stopPropagation={execute}>Execute</button>
            </div>
        </ul>
        {/if}
    
        </div>
    </main>
    
    
    