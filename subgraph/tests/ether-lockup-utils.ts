import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  EtherLocked,
  EtherUnlocked,
  LockupExtended,
  OwnershipTransferred
} from "../generated/EtherLockup/EtherLockup"

export function createEtherLockedEvent(
  id: BigInt,
  name: string,
  owner: Address,
  amount: BigInt,
  releaseTime: BigInt,
  lockType: i32
): EtherLocked {
  let etherLockedEvent = changetype<EtherLocked>(newMockEvent())

  etherLockedEvent.parameters = new Array()

  etherLockedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  etherLockedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  etherLockedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  etherLockedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  etherLockedEvent.parameters.push(
    new ethereum.EventParam(
      "releaseTime",
      ethereum.Value.fromUnsignedBigInt(releaseTime)
    )
  )
  etherLockedEvent.parameters.push(
    new ethereum.EventParam(
      "lockType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(lockType))
    )
  )

  return etherLockedEvent
}

export function createEtherUnlockedEvent(
  id: BigInt,
  name: string,
  owner: Address,
  amount: BigInt
): EtherUnlocked {
  let etherUnlockedEvent = changetype<EtherUnlocked>(newMockEvent())

  etherUnlockedEvent.parameters = new Array()

  etherUnlockedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  etherUnlockedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  etherUnlockedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  etherUnlockedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return etherUnlockedEvent
}

export function createLockupExtendedEvent(
  id: BigInt,
  name: string,
  owner: Address,
  releaseTime: BigInt
): LockupExtended {
  let lockupExtendedEvent = changetype<LockupExtended>(newMockEvent())

  lockupExtendedEvent.parameters = new Array()

  lockupExtendedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  lockupExtendedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  lockupExtendedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  lockupExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "releaseTime",
      ethereum.Value.fromUnsignedBigInt(releaseTime)
    )
  )

  return lockupExtendedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
