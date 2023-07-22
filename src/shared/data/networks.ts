//export const AvailableNetworks: Array<number> = [56];

import { BSCLogo } from "../media/networks/BSCLogo";
import { TestNetLogo } from "../media/networks/TestNetLogo";

export type Token = {
    name: string,
    icon: any,
    contractAddress: string,
    abi: any
}

export type NativeCurrency = {
    name: string,
    symbol: string,
    decimals: number
}

export type NetworkParameters = {
    chainId: string,
    chainName: string,
    nativeCurrency: NativeCurrency,
    rpcUrls: string[],
    blockExplorerUrls: string[] | null
}

export type NetworkData = {
    name: string,
    icon: any,
    networkParams: NetworkParameters,
    tokens: Token[]
}

const map: [number, NetworkData][] = [
    [56, {name: 'BSC',
        icon: BSCLogo,
        networkParams: {
            chainId: '0x38',
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
                name: 'Binance Coin',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com']
        },
        tokens: [
            {
                name: 'BNB',
                icon: BSCLogo,
                contractAddress: '0xFE1Af0f342Fe67050Ed8fA90CC3c43a60f2b987d',
                abi: ''
            }
        ]
    }],

    [1337, {name: 'LTN',
        icon: TestNetLogo,
        networkParams: {
            chainId: '0x539',
            chainName: 'Local Test Net',
            nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['http://127.0.0.1:7545'],
            blockExplorerUrls: null
        },
        tokens: [
            {
                name: 'DEV',
                icon: TestNetLogo,
                contractAddress: '0xFE1Af0f342Fe67050Ed8fA90CC3c43a60f2b987d',
                abi: ''
            }
        ]
    }]

];

export let AvailableNetworks = new Map<number, NetworkData>(map) ;

