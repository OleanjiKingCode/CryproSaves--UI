export const GetALLLockQuery = `
query  {
  etherLockeds(orderBy: id, orderDirection: asc) {
    name
    owner
    amount
    lockType
    locked
    releaseTime
    transactionHash
    id
    blockTimestamp
    blockNumber
  }
}
`;

export const GetOnlyLockedQuery = `
query  {
  etherLockeds(where: {locked: true}, orderBy: id, orderDirection: asc) {
    id
    name
    owner
    amount
    lockType
    locked
  }
}
`;

export const GetOnlyUnlockedQuery = `
query  {
  etherLockeds(where: {locked: false}, orderBy: id, orderDirection: asc) {
    id
    name
    owner
    amount
    lockType
    locked
  }
}
`;
