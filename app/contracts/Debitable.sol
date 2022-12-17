contract Debitable {

// Bank instance
struct Bank {
address id;
uint bank_account;
uint cash;
}
// Read/write account
mapping(address => Bank) public accounts;
mapping(uint => address) public candidates;
uint public candidatesCount;

function createAcc(uint bank_account, uint cash) public returns(address){
    candidatesCount ++;
    address addr = address(bytes20(sha256(abi.encodePacked(candidatesCount, 'block.timestamp'))));
    accounts[addr] = Bank(addr, bank_account, cash);
    candidates[candidatesCount] = addr;
    return (addr);
}

function balances(address addr) public returns(uint, uint){
    return (accounts[addr].bank_account, accounts[addr].cash);
}

function withdraw(address addr, uint amount) public returns(uint, uint){
    accounts[addr].cash = accounts[addr].cash + amount;
    accounts[addr].bank_account = accounts[addr].bank_account - amount;
    return (accounts[addr].bank_account, accounts[addr].cash);
}

function deposit(address addr, uint amount) public returns(uint, uint){
    accounts[addr].cash = accounts[addr].cash - amount;
    accounts[addr].bank_account = accounts[addr].bank_account + amount;
    return (accounts[addr].bank_account, accounts[addr].cash);
}
}