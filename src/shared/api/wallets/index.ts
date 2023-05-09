type EthereumProvider = {
	request: (props: { method: string; params: any }) => any;
	isMetaMask?: boolean;
};

type WithProviders<T> = T & {
	ethereum?: EthereumProvider;
};

export const getProvider = async (): Promise<EthereumProvider | null> => {
	if (typeof window !== 'undefined') {
		const { ethereum } = window as WithProviders<Window>;
		if (ethereum && ethereum.isMetaMask) {
			return ethereum;
		} else {
			return null;
		}
	}
	return null;
};

export const getAccounts = async () => {
	const provider = await getProvider();

	if (provider) {
		return await provider.request({ method: 'eth_requestAccounts', params: [] });
	} else {
		return null;
	}
};
