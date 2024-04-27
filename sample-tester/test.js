const { ethers } = require("ethers");

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
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("YOUR_JSON_RPC_PROVIDER_URL");
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
    const nftContract = new ethers.Contract(nftAddress, abi, signer);

    const address = await signer.getAddress();
    const balance = await tokenContract.balanceOf(address);
    console.log("Token Balance:", balance.toString());

    const mintTx = await nftContract.mintMonster(address, "TOKEN_URI", 50);
    await mintTx.wait();
    console.log("Monster minted!");

    const tokenId = await nftContract.tokenCounter() - 1;
    const tokenURI = await nftContract.tokenURI(tokenId);
    console.log("Token URI:", tokenURI);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
