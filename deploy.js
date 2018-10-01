const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode } = require('./compile');

const provider = new HDWalletProvider (
  'next toss shoulder know act rely mad warrior bachelor green admit faculty',
  'https://ropsten.infura.io/v3/a3a04644194f403381cbd2c1760a349e'
);
const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode})
    .send ({gas: '3000000', from: accounts[0]});
  const version = web3.version;
  console.log('Contract deploy to ', result.options.address);
};
console.log(interface);
deploy();