import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are inside the browser
  web3 = new Web3(window.ethereum.currentProvider); // here we control the version of web3 :)
} else {
  // we are on the server *OR* the browser with no provider
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/88e5ae6f728b434c99488593a1c638d1'
  );

  web3 = new Web3(provider);
}
export default web3;
