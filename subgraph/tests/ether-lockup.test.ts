import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { EtherLocked } from "../generated/schema"
import { EtherLocked as EtherLockedEvent } from "../generated/EtherLockup/EtherLockup"
import { handleEtherLocked } from "../src/ether-lockup"
import { createEtherLockedEvent } from "./ether-lockup-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let name = "Example string value"
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let releaseTime = BigInt.fromI32(234)
    let lockType = 123
    let newEtherLockedEvent = createEtherLockedEvent(
      id,
      name,
      owner,
      amount,
      releaseTime,
      lockType
    )
    handleEtherLocked(newEtherLockedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EtherLocked created and stored", () => {
    assert.entityCount("EtherLocked", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EtherLocked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "EtherLocked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EtherLocked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "EtherLocked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "releaseTime",
      "234"
    )
    assert.fieldEquals(
      "EtherLocked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lockType",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
