import {
  EtherLocked as EtherLockedEvent,
  EtherUnlocked as EtherUnlockedEvent,
  LockupExtended as LockupExtendedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from '../generated/EtherLockup/EtherLockup';
import { EtherLocked, OwnershipTransferred } from '../generated/schema';

export function handleEtherLocked(event: EtherLockedEvent): void {
  let entity = EtherLocked.load(event.params.id.toString());

  if (!entity) {
    entity = new EtherLocked(event.params.id.toString());
  }
  entity.name = event.params.name;
  entity.owner = event.params.owner;
  entity.amount = event.params.amount;
  entity.releaseTime = event.params.releaseTime;
  entity.lockType = event.params.lockType;
  entity.locked = true;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEtherUnlocked(event: EtherUnlockedEvent): void {
  let entity = EtherLocked.load(event.params.id.toString());

  if (!entity) {
    return;
  }
  entity.locked = false;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLockupExtended(event: LockupExtendedEvent): void {
  let entity = EtherLocked.load(event.params.id.toString());
  if (!entity) {
    return;
  }
  entity.releaseTime = event.params.releaseTime;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(event.transaction.hash.toString());
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
