export const base_abi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_admin',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_feeAccount',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_moderatorAccount',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_feeAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_maxPlayers',
				type: 'uint256',
			},
			{
				internalType: 'uint64',
				name: '_gameTime',
				type: 'uint64',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'winner',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'nft',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'id',
						type: 'uint256',
					},
				],
				indexed: false,
				internalType: 'struct DunkinCaps.NFTs[]',
				name: '',
				type: 'tuple[]',
			},
		],
		name: 'ClaimRewards',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'player',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'nft',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'id',
						type: 'uint256',
					},
				],
				indexed: false,
				internalType: 'struct DunkinCaps.NFTs[]',
				name: '',
				type: 'tuple[]',
			},
		],
		name: 'CreateBet',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
		],
		name: 'CreateGame',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'SetFeeAccount',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'SetFeeAmount',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint64',
				name: 'gameTime',
				type: 'uint64',
			},
		],
		name: 'SetGameTime',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'maxPlayers',
				type: 'uint256',
			},
		],
		name: 'SetMaxPlayers',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'SetModerator',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'winner',
				type: 'address',
			},
		],
		name: 'SetWinner',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'betsDetailsOf',
		outputs: [
			{
				internalType: 'address',
				name: 'nft',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
		],
		name: 'claimReward',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'counter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'createGame',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'feeAccount',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'feeAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'gameTime',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'gamesDetailsOf',
		outputs: [
			{
				internalType: 'enum DunkinCaps.Status',
				name: 'status',
				type: 'uint8',
			},
			{
				internalType: 'address',
				name: 'winner',
				type: 'address',
			},
			{
				internalType: 'uint64',
				name: 'expires',
				type: 'uint64',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
		],
		name: 'getBet',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'nft',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'id',
						type: 'uint256',
					},
				],
				internalType: 'struct DunkinCaps.NFTs[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_gameId',
				type: 'uint256',
			},
		],
		name: 'getGame',
		outputs: [
			{
				internalType: 'enum DunkinCaps.Status',
				name: 'status',
				type: 'uint8',
			},
			{
				internalType: 'address[]',
				name: 'players',
				type: 'address[]',
			},
			{
				internalType: 'address',
				name: 'winner',
				type: 'address',
			},
			{
				internalType: 'uint64',
				name: 'expires',
				type: 'uint64',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
		],
		name: 'getNFTsForGame',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'nft',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'id',
						type: 'uint256',
					},
				],
				internalType: 'struct DunkinCaps.NFTs[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
		],
		name: 'getWinner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'nft',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'id',
						type: 'uint256',
					},
				],
				internalType: 'struct DunkinCaps.NFTs[]',
				name: 'nfts',
				type: 'tuple[]',
			},
		],
		name: 'makeBets',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'maxPlayers',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'moderatorAccount',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		name: 'onERC721Received',
		outputs: [
			{
				internalType: 'bytes4',
				name: '',
				type: 'bytes4',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'setFeeAccount',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'setFeeAmount',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'time',
				type: 'uint64',
			},
		],
		name: 'setGameTime',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'players',
				type: 'uint256',
			},
		],
		name: 'setMaxPlayers',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'setModerator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'gameId',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'winner',
				type: 'address',
			},
		],
		name: 'setWinner',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];
