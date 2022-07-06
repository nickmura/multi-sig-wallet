
const contractAddress = "0xAa63908710A262A73a6489AC201E6ad9e5f44Ce9"


const INFURA_ID = '5ac3f71ce3394b2db6959dfe809fc52d'
let provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_txId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_owners",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "_required",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "txId",
				"type": "uint256"
			}
		],
		"name": "Approve",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_txId",
				"type": "uint256"
			}
		],
		"name": "execute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "txId",
				"type": "uint256"
			}
		],
		"name": "Execute",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "easyReturnAddress",
				"type": "address"
			}
		],
		"name": "returnEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_txId",
				"type": "uint256"
			}
		],
		"name": "revoke",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "txId",
				"type": "uint256"
			}
		],
		"name": "Revoke",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "submit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "txId",
				"type": "uint256"
			}
		],
		"name": "Submit",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "approved",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "owners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "required",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactions",
		"outputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"internalType": "bool",
				"name": "executed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let connected
let contract = new ethers.Contract(contractAddress, contractABI, provider)
let value
let balance

async function connectMetamask() {
	window['ethereum'].request({ method: 'eth_requestAccounts'})
	.then((accounts) => {
		console.log(contract)
		connected = accounts[0]
		console.log("Connected with account:", accounts[0])
		provider = new ethers.providers.Web3Provider(window['ethereum'])
		signer = provider.getSigner()
	  	contract = contract.connect(signer)
	})
	.catch((error) => {
	  console.log("User rejected connection request,", error)
	})
}

async function getAddr() {

	provider = new ethers.providers.Web3Provider(window['ethereum'])
	signer = provider.getSigner()
	contract = new ethers.Contract(contractAddress, contractABI, signer)
}

// HTML elements
/* Function invocations */
const submitForm = document.getElementById('submitTransaction') // Submit function invocation (form)
const approveCall = document.getElementById('approve') // Approve function invocation
const revokeCall = document.getElementById('revoke') // Revoke function invocation
const executeCall = document.getElementById('execute') // Execute function invocation

/* Inputs */
const submitAddress = document.getElementById('address') // Address input for submit function
const submitValue = document.getElementById('valuesubmit') // Value input for submit function
const txidApprove = document.getElementById('txidapprove') // Transaction ID input for approve function
const txidRevoke = document.getElementById('txidrevoke') // Transaction ID input for revoke function
const txidExecute = document.getElementById('txidexecute') // Transaction ID input for execute function

/* Error handling elements (ex. 'Insufficient funds', 'Invalid address', etc.)*/
const txCheck = document.getElementById('txcheck') // Error/success handling emit
const anchor = document.createElement('a') // For sucessful transactions (anchor links for etherscan) for txCheck

/* TXid emit */
const txlog = document.getElementById('txlog') // Event emit to be print

//Error handling 
/* Transaction IDs can only be whole numbers */
txidApprove.addEventListener('input', () => {
	txidApprove.value = Math.floor(txidApprove.value);
	if (txidApprove.value === "0") txidApprove.value = '';
	txidApprove.type = ""
	txidApprove.setSelectionRange(txidApprove.value.length, txidApprove.value.length);
	txidApprove.type = "number";
})
txidRevoke.addEventListener('input', () => {
	txidApprove.value = Math.floor(txidApprove.value);
	if (txidApprove.value === "0") txidApprove.value = '';
	txidApprove.type = ""
	txidApprove.setSelectionRange(txidApprove.value.length, txidApprove.value.length);
	txidApprove.type = "number";
})
txidExecute.addEventListener('input', () => {
	txidApprove.value = Math.floor(txidApprove.value);
	if (txidApprove.value === "0") txidApprove.value = '';
	txidApprove.type = ""
	txidApprove.setSelectionRange(txidApprove.value.length, txidApprove.value.length);
	txidApprove.type = "number";
})

/* Validate address */
submitAddress.addEventListener("input", () => {
	try {
		ethers.utils.getAddress(submitAddress.value)
		txCheck.style.color = "green";
		txCheck.style.fontSize = '1rem'
		txCheck.textContent = "Valid address provided."
	} catch (error) {
		txCheck.style.color = "red";
		txCheck.style.fontSize = '1rem'
		txCheck.textContent = "Invalid address provided."
	}
	if (submitAddress.value == '') {
		txCheck.textContent = ""
	}

})

/*Validate value (insufficient funds or not) */
submitValue.addEventListener("input", async () => {
	getAddr()
	let value = document.getElementById('valuesubmit').value
	let balance = ethers.utils.formatEther(ethers.BigNumber.from(await signer.getBalance()))
	signer = provider.getSigner()
	if (parseFloat(value) > parseFloat(balance)) {
		txCheck.style.color = "red";
		txCheck.style.fontSize = '1rem'
		txCheck.textContent = "Insufficient funds."
	} if (parseFloat(value) < parseFloat(balance)) {
		txCheck.textContent = ""
	} if (value === '') {
		txCheck.textContent = ""
	} else {
		return
	}
	
})


// Function calls
/* Submit invocation */
submitForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
	provider = new ethers.providers.Web3Provider(window['ethereum'])
	signer = provider.getSigner()
	contract = new ethers.Contract(contractAddress, contractABI, signer)
	

	/* Empty input error handling...*/
	if (submitAddress.value == '') {
		txCheck.style.fontSize = '1rem'
		txCheck.style.color = 'red'
		txCheck.textContent = 'No address provided.'
	} if (submitValue.value == '') {
		txCheck.style.fontSize = '1rem'
		txCheck.style.color = 'red'
		txCheck.textContent = 'No value provided.'
	}
	if (submitValue.value == '' && submitAddress.value == '') {
		txCheck.style.fontSize = '1rem'
		txCheck.style.color = 'red'
		txCheck.textContent = 'No address or value provided.'
	}
	const tx = await contract.submit(submitAddress.value, ethers.utils.parseUnits(`${submitValue.value}`, 18), "0x", { value: ethers.utils.parseUnits(`${submitValue.value}`, 18) })
	txCheck.style.color = 'green';
	txCheck.textContent = `Transaction ID ${txidApprove.value} awaiting submittion...`
	contract.once('Submit', (log) => {
		txlog.textContent = `Transaction ID: ${log.toString()}`
	})
	await tx.wait()
	txCheck.textContent = ''
	anchor.textContent = 'Transaction successfully submitted.'
	anchor.href = `http://rinkeby.etherscan.io/tx/${tx.hash}`
	anchor.target = "_blank"
	txCheck.appendChild(anchor)
	console.log("Transaction confirmed! Etherscan:", `http://rinkeby.etherscan.io/tx/${tx.hash}`, tx.hash);
	} catch (error) {
		if (error.message.includes('User denied transaction signature.')) {

			txCheck.textContent = ''
		}
		if (error.message.includes('execution reverted: invalid owner')) {
			anchor.remove()
			txCheck.style.color = 'red';
			txCheck.style.fontSize = '0.9rem'
			txCheck.textContent = 'Transaction reverted: Invalid owner'
		}
		if (error.message.includes('err: insufficient funds for gas')) {
			anchor.remove()
			txCheck.style.color = 'red';
			txCheck.style.fontSize = '1rem'
			txCheck.textContent = 'Insufficient funds.'
		}
	}
})

/* Approve invocation */
approveCall.addEventListener('click', async (e) => {
	e.preventDefault();
	try {
		provider = new ethers.providers.Web3Provider(window['ethereum'])
		signer = provider.getSigner()
		contract = new ethers.Contract(contractAddress, contractABI, signer)
		if (txidApprove.value == '') { 
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '1rem'
			txCheck.textContent = 'No transaction ID provided.'
		}
		const tx = await contract.approve(txidApprove.value)
		txCheck.style.fontSize = '1rem'
		txCheck.style.color = 'green'
		txCheck.textContent = `Transaction ID ${txidApprove.value} awaiting approval...`
		await tx.wait()
		txCheck.textContent = ''
		txCheck.style.fontSize = '0.9rem'
		anchor.textContent = `Transaction ID ${txidApprove.value} successfully approved.`
		anchor.href = `http://rinkeby.etherscan.io/tx/${tx.hash}`
		anchor.target = "_blank"
		txCheck.appendChild(anchor)
		console.log("Transaction confirmed! Etherscan:", `http://rinkeby.etherscan.io/tx/${tx.hash}`, tx.hash);
	} catch (error) {
		if (error.message.includes('execution reverted: invalid owner')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.9rem'
			txCheck.textContent = 'Transaction reverted: invalid owner'
		}
		if (error.message.includes('execution reverted: tx does not exist')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.76rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID does not exist'
		}
		if (error.message.includes('execution reverted: tx was approved by owner')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.71rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID already approved.'
		}
		if (error.message.includes('execution reverted: tx not approved')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.73rem'
			txCheckr.textContent = 'Transaction reverted: Transaction ID already executed.'
		}
	}
})

/* Revoke invocation */
revokeCall.addEventListener('click', async (e) => {
	e.preventDefault();
	try {
		if (txidRevoke.value == '') { 
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '1rem'
			txCheck.textContent = 'No transaction ID provided.'
		}
		provider = new ethers.providers.Web3Provider(window['ethereum'])
		signer = provider.getSigner()
		contract = new ethers.Contract(contractAddress, contractABI, signer)
		const tx = await contract.revoke(txidRevoke.value)
		txCheck.style.fontSize = '1rem'
		txCheck.style.color = 'green'
		txCheck.textContent = `Transaction ID ${txidRevoke.value} revoking, awaiting...`
		await tx.wait()
		txCheck.textContent = ''
		txCheck.style.fontSize = '0.9rem'
		anchor.textContent = `Transaction ID ${txidRevoke.value} successfully revoked.`
		anchor.href = `http://rinkeby.etherscan.io/tx/${tx.hash}`
		anchor.target = "_blank"
		txCheck.appendChild(anchor)
		console.log("Transaction confirmed! Etherscan:", `http://rinkeby.etherscan.io/tx/${tx.hash}`, tx.hash);
	} catch (error) {
		if (error.message.includes('execution reverted: invalid owner')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.9rem'
			txCheck.textContent = 'Transaction reverted: invalid owner'
		}
		if (error.message.includes('execution reverted: tx does not exist')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.76rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID does not exist'
		}
		if (error.message.includes('execution reverted: tx not approved')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.71rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID needs to be approved.'
		}
		if (error.message.includes('execution reverted: tx was already executed')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.73rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID already executed.'
		}
	}
})
/*Execute invocation */
executeCall.addEventListener('click', async (e) => {
	e.preventDefault();
	try {
		provider = new ethers.providers.Web3Provider(window['ethereum'])
		signer = provider.getSigner()
		contract = new ethers.Contract(contractAddress, contractABI, signer)
		if (txidExecute.value == '') { 
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '1rem'
			txCheck.textContent = 'No transaction ID provided.'
		}
		const tx = await contract.execute(txidExecute.value)
		txCheck.style.fontSize = '1rem'
		txCheck.style.color = 'green'
		txCheck.textContent = `Transaction ID ${txidExecute.value} execute, awaiting...`
		await tx.wait()
		txCheck.textContent = ''
		txCheck.style.fontSize = '0.9rem'
		anchor.textContent = `Transaction ID ${txidExecute.value} successfully executed.`
		anchor.href = `http://rinkeby.etherscan.io/tx/${tx.hash}`
		anchor.target = "_blank"
		txCheck.appendChild(anchor)
		console.log("Transaction confirmed! Etherscan:", `http://rinkeby.etherscan.io/tx/${tx.hash}`, tx.hash);
	} catch (error) {
		if (error.message.includes('execution reverted: invalid owner')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.9rem'
			txCheck.textContent = 'Transaction reverted: invalid owner'
		}
		if (error.message.includes('execution reverted: tx does not exist')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.76rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID does not exist'
		}
		if (error.message.includes('approvals is less than required')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.71rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID requires approvals.'
		}
		if (error.message.includes('execution reverted: tx was already executed')) {
			anchor.remove()
			txCheck.style.color = 'red'
			txCheck.style.fontSize = '0.72rem'
			txCheck.textContent = 'Transaction reverted: Transaction ID already executed.'
		}
	}
})






document.querySelector('#connect-metamask').addEventListener("click", connectMetamask);

