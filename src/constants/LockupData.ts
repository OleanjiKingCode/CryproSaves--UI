export const LockupAddress = '0x4b1D98AF1af713456c1fC86Afed67b94c4648f6d';

export const LockupABIFull = [
  {
    inputs: [{ internalType: 'uint256', name: '_months', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'AdditionalMonthsShouldBeMoreThanZero', type: 'error' },
  { inputs: [], name: 'CannotLockZeroEther', type: 'error' },
  { inputs: [], name: 'LockupIsntLocked', type: 'error' },
  { inputs: [], name: 'NoLockupHasBeenDone', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'UnlockTimeHasNotReached', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'releaseTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'lockType',
        type: 'string',
      },
    ],
    name: 'EtherLocked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EtherUnlocked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'releaseTime',
        type: 'uint256',
      },
    ],
    name: 'LockupTimeExtended',
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
    inputs: [],
    name: 'emergencyUnlockTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_additionalMonths', type: 'uint256' },
      { internalType: 'uint256', name: '_lockId', type: 'uint256' },
    ],
    name: 'extendLockTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllLockUps',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'lockId', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'lockType', type: 'string' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'releaseTime', type: 'uint256' },
          { internalType: 'bool', name: 'locked', type: 'bool' },
        ],
        internalType: 'struct Cryprto.Lockup[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_lockId', type: 'uint256' }],
    name: 'getLockupDetailsById',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'lockId', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'lockType', type: 'string' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'releaseTime', type: 'uint256' },
          { internalType: 'bool', name: 'locked', type: 'bool' },
        ],
        internalType: 'struct Cryprto.Lockup',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_months', type: 'uint256' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_lockType', type: 'string' },
    ],
    name: 'lockEther',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'lockups',
    outputs: [
      { internalType: 'uint256', name: 'lockId', type: 'uint256' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'lockType', type: 'string' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'releaseTime', type: 'uint256' },
      { internalType: 'bool', name: 'locked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
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
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_lockId', type: 'uint256' }],
    name: 'unlockEther',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawAllEther',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];

export const ConnectorAddress = '0x114e8Db3e4383a41FA97dB25dF7688b933de312F'
export const ConnectorAddressPolygon =
  '0xe2A8f7Ae48015dFB6EaEBcc05168f5374C6322f8';
export const ConnectorABIPolygon = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: true,
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    name: 'UserAdded',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'contractAddress', type: 'address' },
    ],
    name: 'addUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getAddresses',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newAddress', type: 'address' }],
    name: 'updateAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
