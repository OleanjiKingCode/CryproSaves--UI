import {
  EtherLocked as EtherLockedEvent,
  EtherUnlocked as EtherUnlockedEvent,
  LockupExtended as LockupExtendedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/EtherLockup/EtherLockup"
import {
  EtherLocked,
  EtherUnlocked,
  LockupExtended,
  OwnershipTransferred
} from "../generated/schema"

export function handleEtherLocked(event: EtherLockedEvent): void {
  let entity = new EtherLocked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.EtherLockup_id = event.params.id
  entity.name = event.params.name
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.releaseTime = event.params.releaseTime
  entity.lockType = event.params.lockType
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEtherUnlocked(event: EtherUnlockedEvent): void {
  let entity = new EtherUnlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.EtherLockup_id = event.params.id
  entity.name = event.params.name
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLockupExtended(event: LockupExtendedEvent): void {
  let entity = new LockupExtended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.EtherLockup_id = event.params.id
  entity.name = event.params.name
  entity.owner = event.params.owner
  entity.releaseTime = event.params.releaseTime
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
