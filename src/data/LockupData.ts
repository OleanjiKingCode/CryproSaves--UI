export const LockupAddress = '0xD40750a362a7288220fea047A2E8A15C3B7d8188';

export const LockupABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
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
        internalType: 'enum EtherLockup.LockType',
        name: 'lockType',
        type: 'uint8',
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
    name: 'LockupExtended',
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
    name: 'extendLockup',
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
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'releaseTime', type: 'uint256' },
          { internalType: 'bool', name: 'locked', type: 'bool' },
          {
            internalType: 'enum EtherLockup.LockType',
            name: 'lockType',
            type: 'uint8',
          },
        ],
        internalType: 'struct EtherLockup.Lockup[]',
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
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'releaseTime', type: 'uint256' },
          { internalType: 'bool', name: 'locked', type: 'bool' },
          {
            internalType: 'enum EtherLockup.LockType',
            name: 'lockType',
            type: 'uint8',
          },
        ],
        internalType: 'struct EtherLockup.Lockup',
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
      {
        internalType: 'enum EtherLockup.LockType',
        name: '_lockType',
        type: 'uint8',
      },
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
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'releaseTime', type: 'uint256' },
      { internalType: 'bool', name: 'locked', type: 'bool' },
      {
        internalType: 'enum EtherLockup.LockType',
        name: 'lockType',
        type: 'uint8',
      },
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
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
