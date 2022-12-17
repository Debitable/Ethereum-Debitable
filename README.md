<div align="center">
  <p>
    <a href="https://github.com/Debitable/Ethereum-Debitable"><img src="https://i.imgur.com/9q4gLid.png" width="500" alt="Debitable" /></a>
    <h1>Debitable - Ethereum</h1>
  </p>

<a href="https://github.com/Debitable/Ethereum-Debitable/issues"><img src="https://camo.githubusercontent.com/f5054ffcd4245c10d3ec85ef059e07aacf787b560f83ad4aec2236364437d097/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f6e747269627574696f6e732d77656c636f6d652d627269676874677265656e2e7376673f7374796c653d666c6174" alt="Contributions" /></a>
<a href="https://github.com/Debitable/Ethereum-Debitable/actions"><img src="https://github.com/Debitable/Ethereum-Debitable/actions/workflows/npm-grunt.yml/badge.svg" alt="Node Application Test" /></a>
<a href="https://github.com/Debitable/Ethereum-Debitable"><img src="https://img.shields.io/github/languages/count/Debitable/Ethereum-Debitable" alt="Languages" /></a>
<a href="https://github.com/Debitable/Ethereum-Debitable/LICENSE"><img alt="LICENSE" src="https://img.shields.io/github/license/Debitable/Ethereum-Debitable" /></a>

Ethereum implementation of <b>Debitable</b> using [Truffle](https://trufflesuite.com/) and [Ganache](https://trufflesuite.com/ganache/).
</div>

<h2>Features:</h2>

- QR Code based account addresses
- Identification Address based transfer and authentication
- Withdraw AggieCoins
- Deposit AggieCoins
- Transaction History

**Pending**:
- [ ] Improved Sign-out using state management
- [ ] Fix withdraw and deposit bug for existing user login
- [ ] Borrowing and lending features
- [ ] Detailed testing and bug-fixes

## Pre-requisites
1. Node >= 12.17.0
2. The MetaMask wallet installed. Instructions [here](https://metamask.io/download/)
3. Ganache and Truffle. Instructions to install Ganache [here](https://trufflesuite.com/ganache/) and Truffle [here](https://trufflesuite.com/docs/truffle/how-to/install/)

## Building the Solidity code
1. Enter the app directory in a terminal: `cd app`
1. Build the code: `truffle migrate`
1. To build again use: `truffle migrate --reset`

## Start Ganache and connect to MetaMask
1. Open the Ganache GUI and click on new work space.
2. Import the account private keys from Ganache to MetaMask, we will use this later.

## Interacting with our package
1. In a terminal go to the app folder of this project (Ethereum-Debitable/app)
2. Install the npm dependencies: `npm install`
3. Start the local server with `npm run dev`
4. Open up your browser at the provided URL if it doesn't open automatically.
5. Connect MetaMask to the application.
6. Use the imported account created earlier and Identification Address to interact with the system.
