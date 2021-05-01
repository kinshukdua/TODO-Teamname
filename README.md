# Vaccine Blockchain
A demo by //TODO: Teamname for DEVSOC'21
A decentralized Ethereum application for tracking the distribution of Covid 19 vaccinations and issuing certificates.

## Description
In many developing countries 
(like India), inefficiencies in the supply chain for vaccines are of grave concern; these inefficiencies result in millions of people not being fully immunized and creates significant threat to the country and society as a whole. However, issues such as vaccine expiration and vaccine record fraud, are still widespread in vaccine supply chains. Therefore, an effective management system for the supervision of vaccine supply chains is urgently required. 
We propose a system based on Blockchain where every step of the production, is monitored using IoT based device that stores each step of the production and supply chain as a transaction in a blockchain. This will provide 100% transparency, letting anyone from the country, the supply chain or the government verify the state of vaccine production and also account for any wastage and work on that accordingly. Furthermore, because of the decentralized nature of blockchain, there's no way to alter the public ledger and therefore we will also implement a system that would keep track of all vaccination, so it can also be used as a vaccination record.

## Requirements
Get Node here: https://nodejs.org/en/
Get Ganache here: https://www.trufflesuite.com/ganache
Get MetaMask here: https://metamask.io/

## Steps to run the app
Import the truffle-config.js into ganache and use the private key to connect to your MetaMask wallet at Localhost 7545. With Ganache running, and MetaMask connected to the Ganache RPC:

1. Clone this repository
2. npm install truffle -g
3. npm install
4. truffle compile
3. truffle migrate
4. npm run dev

Interact with the transaction cards to issue a certification of proof of vaccination along with a QR Code that details the transaction