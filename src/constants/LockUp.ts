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
