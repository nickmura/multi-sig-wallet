// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MultiSigWallet {
    // events for different paramaters
    event Deposit(address indexed sender, uint amount);
    event Submit(uint indexed txId);
    event Approve(address indexed owner, uint indexed txId);
    event Revoke(address indexed owner, uint indexed txId);
    event Execute(uint indexed txId);



    // Tranasaction paramaters
    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
    }

    address[] public owners; // Addresses of owners.
    mapping(address => bool) public isOwner; // if an address is an owner of the multi-signature wallet, it will return true. Otherwise, false.
    uint public required; // Number of owners required to execute a transaction.

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public approved; // Storing the approval of each transcation.
    // uint = index of a transaction, to a mapping of another address, to a boolean.
    // Indicates if a owner has approved a transaction, or not.


    modifier onlyOwner() { // Indicates if msg.sender is not owner. If isOwner == msg.sender, onlyOwner gets passed into function
        require(isOwner[msg.sender], "invalid owner");
        _;
    }

    modifier txExists(uint _txId) { // Checks if transaction exists or was initalized.
        require(_txId < transactions.length, "tx does not exist");
        _;
    }

    modifier notApproved(uint _txId) { // Checks if transaction is not yet approved.
        require(!approved[_txId][msg.sender], "tx was approved by owner");
        _;
    }
    
    modifier notExecuted(uint _txId) {
        require(!transactions[_txId].executed, "tx was already executed");
        _;
    }



    constructor(address[] memory _owners, uint _required) {
        require(_owners.length > 0, "owner(s) required"); // Requires the at least one owner.
        require(_required > 0 && _required <= _owners.length, // Required uint needs to be less than the owners initalized.
        "invalid required number of owners");


        for (uint i = 0; i < _owners.length; i++) { 
            address owner = _owners[i]; // Saves owners to state variable
            require(owner != address(0), "invalid owner"); // Makes sure owner != address(0)
            require(!isOwner[owner], "owner is not unique"); // Makes sure owner is unique.

            isOwner[owner] = true; //
            owners.push(owner); // Pushes owner to global state variable of owners.

        }
        required = _required; // Assigns global state variable required to state variable.
    }

    receive() external payable { // Fallback recieve function to recieve ether.
        emit Deposit(msg.sender, msg.value);
        
    }

    function submit(address _to, uint _value, bytes calldata _data) external onlyOwner payable { // Initalizes / Submits a transaction
        //pushes the next transaction into the queue that is being submitted
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false // As we haven't actually created a transaction yet.
        }));
        emit Submit(transactions.length - 1); /* Emits the new transaction being submitted to the 'pool' of existing transactions. The (- 1) represents the index 
        of the latest transaction being stored, as the latest transaction will always have a index of 0.*/
    }

    function approve(uint _txId) external
    onlyOwner 
    txExists(_txId)
    notApproved(_txId)
    notExecuted(_txId) 
    {   // ^ All the nessescary modifiers to fullfill the function.
        approved[_txId][msg.sender] = true; // storing approval of msg.sender
        emit Approve(msg.sender, _txId); // prints the approval to log
    }

    function _getApprovalCount(uint _txId) private view returns (uint count) {
        for (uint i; i < owners.length; i++) { // For each owner, loop check if approved is true. If true, increment the count.
            if (approved[_txId][owners[i]]) { // if owners approved transaction of i, increment the count.
                count += 1;
            }
        }
    }

    function execute(uint _txId) external txExists(_txId) notExecuted(_txId) payable {
        require(_getApprovalCount(_txId) >= required, "approvals is less than required"); // Needs nessescary approvalCount to be equal or greater than required.
        Transaction storage transaction = transactions[_txId]; // Storing transaction data in the 'Transaction' struct.
        transaction.executed = true; // Makes transaction executed = true.

        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data); // Calls transaction objects to 'to' address.

        require(success, "Transaction failed"); // Requires success = true, otherwise transaction failed.

        emit Execute(_txId); // Emits the transaction id.

    }

    function revoke(uint _txId) external 
    onlyOwner
    txExists(_txId) 
    notExecuted(_txId) 
    { // ^ Requires only the owner to call this function, makes sure the transcation exists, and it has not actually executed or fulfilled.

        require(approved[_txId][msg.sender], "tx not approved");
        approved[_txId][msg.sender] = false;
        emit Revoke(msg.sender, _txId);
    }


    // Emergency return eth function. 
    function returnEth(address easyReturnAddress) public {
        payable(easyReturnAddress).transfer(address(this).balance); // Returns all eth in contract to EOA (easyReturnAddress)
    }

}
