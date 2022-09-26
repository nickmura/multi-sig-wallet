# multi-sig-wallet
Multi signature wallet contract in Solidity. Requires multiple signatures from different owners for transacting. [See here.](https://en.wikipedia.org/wiki/Multisignature)
I may create another one in the future. [Click here to see the frontend I've made.](https:/multisig.nickmura.ca/multi-sig-wallet) 

# Instructions (pure contract invocation in Remix, solidity)
This contract requires multiple arguments for functions, including the constructor (deploying the contract.) In [Remix](https://remix.ethereum.org), click the upside down arrow and you will see you can put each argument for the constructor.

![image](https://user-images.githubusercontent.com/92566574/165650833-264613ca-8d47-41ef-8b91-f08e9ccdc9a1.png)



Put your address in an array format with double quotes in the `_owners` argument, as shown in example below. ex. `["0x......address1", "0x......address2", 0x......address2"]`. `_required` is the nessescary approvals from owners / digital signatures to execute a transaction. For instance, if you have 3 owners, you could have 2 or 3 required approvals to execute. Click 'transact' to deploy contract. Notice how I have no value being sent as I deploy this contract.


![image](https://user-images.githubusercontent.com/92566574/165653161-e0658499-e4fc-4950-98ba-f8303efee224.png)



Notice that we have deployed with no value (as adding value when deploying will result in an error). For other owners to approve, execute function calls etc, they will 'Load contract from address' and paste the instance of the contract.
![image](https://user-images.githubusercontent.com/92566574/165653649-77731e72-4192-43cd-b07b-f0454a0eff6d.png)



Paste your EOA (metamask address) in `isOwner` to see if the address is an owner or not. (isOwner = true)
![image](https://user-images.githubusercontent.com/92566574/165654188-b3199597-d487-4cc6-9280-eb50a8461900.png)




Now, as one of the owners, we can `submit`, `approve`, `revoke`, and `execute`. To submit a transaction, we can first load the contract with ether by calling the fallback recieve function, and or just call the `submit` function with some ether if you didn't send ether using the fallback. Unfortunately we have to put Wei as the unit for the `submit` function. [See ether unit converter here.](https://eth-converter.com/)
![image](https://user-images.githubusercontent.com/92566574/165654417-70de78bb-53a4-4044-a56c-c445130aebba.png)

![image](https://user-images.githubusercontent.com/92566574/165654673-41a032c1-9e30-47ec-94b9-a137f7bf285a.png)

![image](https://user-images.githubusercontent.com/92566574/165654826-8e36b8c4-abe6-4ac6-9052-52e8135768c5.png)


After you complete the submit call, the function with emit a `txId` as an index (0 being first transaction, 1 being second). The `txId` is called as an argument for the approve, revoke and execute function when you call them.

![image](https://user-images.githubusercontent.com/92566574/165667433-d76fbf19-450c-4209-a710-fcd8f1739bbe.png)


As mentioned before, put the index of `txId` in approve, and submit (or revoke). There must be as many approvals as there was `_required` declared in the constructor. (if there was '2' in `_required`, there must be 2 approve calls from different owners.)

![image](https://user-images.githubusercontent.com/92566574/165667875-223347ef-8aad-410e-a9c7-fd82775ddd19.png)

After the required amount of approvals have been met, any owner can call the execute function with the `txId`.

![image](https://user-images.githubusercontent.com/92566574/165668016-a24a7e3e-7fae-4e0a-8a66-d77fbe605561.png)

If you have followed the steps above, you have successfully created a transaction with a multi-sig wallet.







## To-do
- [x] Need to provide instructions on how it's used. (function calls are hard)
- [x] Need to optimize functionality of contract.
- [x] Working on front-end interaction of multi-sig.
- [x] Finished a rough version of front-end interaction of multi-sig.
- [x] Need to reformat and make mobile friendly UI.
- [x] Reformat in Svelte.
- [x] Create new UI that is much better.
- [x] Optimized to a good deal.
- [x] Create instances (allow users to deploy their own multi-sig
- [x] Perform an audit.
- [x] Ultimately finish frontend and release a decent version.
- [x] Polish, refactor code to the best possible version.
- [ ] Create and integrate postgres tables for transaction IDs and contract information.  
- [ ] Showcase and tell people. 
