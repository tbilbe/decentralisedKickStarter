// import Web3 from 'web3';

// let web3;

// // const getProvider = async () => {
// //   await window.web3.currentProvider.enable(); // request authentication
// // };

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   // we are inside the browser
//   // getProvider();
//   web3 = new Web3(window.ethereum.currentProvider.enable()); // here we control the version of web3 :)

  
  
  
// } else {
//   // we are on the server *OR* the browser with no provider
//   const provider = new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/v3/88e5ae6f728b434c99488593a1c638d1'
//   );

//   web3 = new Web3(provider);
// }
// export default web3;



import Web3 from 'web3';
 
let web3;
 
const ethEnabled = () => {
    if (typeof window !== 'undefined'){
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        web3 = window.web3
        window.ethereum.enable();
        return true;
        }
        return false;
    } else {
        const provider = new Web3.providers.HttpProvider(
            'https://rinkeby.infura.io/v3/af195d9e463741d8b84cf841d12b0b8c'
            );
        web3 = new Web3(provider);
    }
}
ethEnabled()
 
export default web3;