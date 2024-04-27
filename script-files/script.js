const tokenAddress = "ENTER THE ERC20 TOKEN ADDRESS WHICH WILL BE USED";
const nftAddress = " ENTER THE ERC721 TOKEN ADDRESS WHICH WILL BE USED";
const abi = [
    // ERC20 ABI
    {
        "constant": true,
        "inputs": [],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
  

    // ERC721 ABI
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "mintMonster",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
 // ABI for ERC20 and ERC721 contracts

let signer;
let tokenContract;
let nftContract;

async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            tokenContract = new ethers.Contract(tokenAddress, abi, signer);
            nftContract = new ethers.Contract(nftAddress, abi, signer);

            const address = await signer.getAddress();
            document.getElementById("walletAddress").innerText = `Connected Wallet Address: ${address}`;

            const balance = await tokenContract.balanceOf(address);
            document.getElementById("powerLevel").innerText = `Power Level: ${balance.toString()}`;
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Please install MetaMask to connect your wallet.");
    }
}

async function mintMonster() {
    try {
        const tx = await nftContract.mintMonster(signer.getAddress(), "TOKEN_URI", Math.floor(Math.random() * 100) + 1);
        await tx.wait();
        const tokenId = await nftContract.tokenCounter() - 1;
        const tokenURI = await nftContract.tokenURI(tokenId);
        document.getElementById("mintedMonsters").innerHTML += `<img src="${tokenURI}" style="max-width: 100px; margin: 10px;">`;
    } catch (error) {
        console.error(error);
    }
}
